import Router from 'express'
import { AuthMiddleware, RoleMiddleware } from '../user/auth/middleware.js'
import NotificationController from './controller.js'

const router = new Router()

router.post('/', RoleMiddleware('admin'), NotificationController.create)
router.get('/', RoleMiddleware('admin'), NotificationController.getAll)
router.get('/:id', RoleMiddleware('admin'), NotificationController.getOne)
router.put('/', RoleMiddleware('admin'), NotificationController.update)
router.patch('/:id', AuthMiddleware, NotificationController.read)
router.delete('/:id', RoleMiddleware('admin'), NotificationController.delete)

export default router