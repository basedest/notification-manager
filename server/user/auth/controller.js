import jwt from "jsonwebtoken"
import 'dotenv/config'
import bcrypt from "bcryptjs"

import db from "../../db.js"
import { validationResult } from "express-validator"

const findUserQuery = 'SELECT * FROM users WHERE name = $1'

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"} )
}

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password} = req.body
            const candidate = (await db.query(findUserQuery, [username])).rows[0]
            if (candidate) {
                return res.status(400).json({message: "This username is already taken"})
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            const userRole = 'user'
            const user = (
                await db.query('INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *',
                [username, hashPassword, userRole])
            ).rows[0]
            const token = generateAccessToken(user.id, user.role)
            return res.json({message: "Registration success", token, role: user.role})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = (await db.query(findUserQuery, [username])).rows[0]
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Incorrect password`})
            }
            const token = generateAccessToken(user.id, user.role)
            return res.json({token, role: user.role})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

export default new AuthController()