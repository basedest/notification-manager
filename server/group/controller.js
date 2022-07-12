import GroupService from './service.js'

class GroupController {
    async create(req, res) {
        try {
            const group = await GroupService.create(req.body)
            return res.json(group)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        try {
            const groups = await GroupService.getAll()
            return res.json(groups)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const group = await GroupService.getOne(req.params.id)
            return res.json(group)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedGroup = await GroupService.update(req.body)
            return res.json(updatedGroup)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const group = await GroupService.delete(req.params.id)
            return res.json(group)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new GroupController()