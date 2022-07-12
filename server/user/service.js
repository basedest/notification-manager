import db from "../db.js"

const createQuery = 'INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *'
const getAllQuery = 'SELECT * FROM users'
const getOneQuery = 'SELECT * FROM users where id = $1'
const updateQuery = 'UPDATE users SET name = $1, password = $2, role = $3 WHERE id = $4 RETURNING *'
const deleteQuery = 'DELETE FROM users where id = $1'

class UserService {
    async create(user) {
        const {name, password, role} = user
        const newUser = await db.query(createQuery, [name, password, role])
        return newUser.rows[0]
    }

    async getAll() {
        const users = await db.query(getAllQuery)
        return users.rows
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const user = await db.query(getOneQuery, [id])
        return user.rows[0]
    }

    async update(user) {
        if (!user.id) {
            throw new Error('ID is not specified')
        }
        const {id, name, password, role} = user
        const updatedUser = await db.query(updateQuery, [name, password, role, id])
        return updatedUser.rows[0]
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const user = await db.query(deleteQuery, [id])
        return user.rows[0]
    }

    async getNotifications(id, unreads) {
        const notifications = (await db.query(
            `SELECT notification_id as id, content, time FROM users_to_notifications JOIN notifications
            ON notification_id = notifications.id WHERE user_id = ${id} ${unreads ? 'AND read = FALSE' : ''}
            ORDER BY time DESC`)).rows
        return notifications
    }
}

export default new UserService()