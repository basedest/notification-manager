import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.JWT_SECRET

export const AuthMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthenticated user"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Authentication failed"})
    }
}

export const RoleMiddleware = role => {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req?.headers?.authorization?.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Unauthenticated user"})
            }
            const {role: userRole} = jwt.verify(token, secret)
            if (userRole !== role) {
                return res.status(403).json({message: "Permisson denied"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Authentication failed"})
        }
    }
}