import db from "../db.js"

const createQuery = 'INSERT INTO notifications (n_type, content, time) VALUES ($1, $2, $3) RETURNING *'
const getAllQuery = 'SELECT * FROM notifications'
const getOneQuery = 'SELECT * FROM notifications where id = $1'
const updateQuery = 'UPDATE notifications SET n_type = $1, content = $2, time = $3 WHERE id = $4 RETURNING *'
const deleteQuery = 'DELETE FROM notifications where id = $1'

class NotificationService {
    async create(notification) {
        const {type, content} = notification
        const time = new Date().toISOString()
        const newNotification = (await db.query(createQuery, [type, content, time])).rows[0]
        if (type === 'everyone') {
            const user_ids = (await db.query('SELECT id FROM users')).rows
            for (const user of user_ids) {
                await db.query('INSERT INTO users_to_notifications (user_id, notification_id) VALUES ($1, $2)',
                [user.id, newNotification.id])
            }
        }
        else if (type === 'group') {
            const user_ids = (await db.query(`SELECT user_id FROM users_to_groups WHERE group_id = ${notification.group}`)).rows
            for (const user of user_ids) {
                await db.query('INSERT INTO users_to_notifications (user_id, notification_id) VALUES ($1, $2)',
                [user.user_id, newNotification.id])
            }
        }
        else if (type === 'user') {
            await db.query('INSERT INTO users_to_notifications (user_id, notification_id) VALUES ($1, $2)',
            [notification.user_id, newNotification.id])
        }
        return newNotification
    }

    async getAll() {
        const notifications = await db.query(getAllQuery)
        return notifications.rows
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const notification = await db.query(getOneQuery, [id])
        return notification.rows[0]
    }

    async update(notification) {
        if (!notification.id) {
            throw new Error('ID is not specified')
        }
        const {id, type, content, time} = notification
        const updatedNotification = await db.query(updateQuery, [type, content, time, id])
        return updatedNotification.rows[0]
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const notification = await db.query(deleteQuery, [id])
        return notification.rows[0]
    }
    
    async read(notification_id, user_id) {
        const notification = (await
        db.query('UPDATE users_to_notifications SET read = TRUE WHERE notification_id = $1 AND user_id = $2 RETURNING *',
        [notification_id, user_id])).rows[0]
        return notification
    }
}

export default new NotificationService()