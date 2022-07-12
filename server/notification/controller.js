import NotificationService from './service.js'

class NotificationController {
    async create(req, res) {
        try {
            const notification = await NotificationService.create(req.body)
            return res.json(notification)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        try {
            const notifications = await NotificationService.getAll()
            return res.json(notifications)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const notification = await NotificationService.getOne(req.params.id)
            return res.json(notification)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedNotification = await NotificationService.update(req.body)
            return res.json(updatedNotification)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const notification = await NotificationService.create(req.params.id)
            return res.json(notification)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async read(req,res) {
        try {
            const notification = await NotificationService.read(req.params.id, req.user.id)
            return res.json(notification)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new NotificationController()