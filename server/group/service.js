import db from "../db.js"

const createQuery = 'INSERT INTO groups (name) VALUES ($1) RETURNING *'
const getAllQuery = 'SELECT * FROM groups'
const getOneQuery = 'SELECT * FROM groups where id = $1'
const updateQuery = 'UPDATE groups SET name = $1 WHERE id = $2 RETURNING *'
const deleteQuery = 'DELETE FROM groups where id = $1 RETURNING *'

class GroupService {
    async create(group) {
        const {name} = group
        const newGroup = (await db.query(createQuery, [name])).rows[0]
        if (group.users) {
            for (const user of group.users) {
                await db.query('INSERT INTO users_to_groups (user_id, group_id) VALUES ($1, $2)', [user, newGroup.id])
            }
        }
        return newGroup
    }

    async getAll() {
        const groups = await db.query(getAllQuery)
        return groups.rows
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const group = (await db.query(getOneQuery, [id])).rows[0]
        const users = (await db.query('SELECT user_id, name FROM users_to_groups JOIN users ON user_id = users.id WHERE group_id = $1', [id])).rows
        return {...group, users}
    }

    async rename(group) {
        if (!group.id) {
            throw new Error('ID is not specified')
        }
        const {id, name} = group
        const updatedGroup = await db.query(updateQuery, [name, id])
        return updatedGroup.rows[0]
    }

    async add_user(group_id, user_id) {
        await db.query('INSERT INTO users_to_groups (user_id, group_id) VALUES ($1, $2)', [user_id, group_id])
    }

    async remove_user(group_id, user_id) {
        await db.query('DELETE FROM users_to_groups WHERE group_id = $1 AND user_id = $2', [user_id, group_id])
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const group = await db.query(deleteQuery, [id])
        return group.rows[0]
    }
}

export default new GroupService()