import Router from 'express'
import { AuthMiddleware, RoleMiddleware } from './auth/middleware.js'
import UserController from './controller.js'

const router = new Router()

router.get('/', RoleMiddleware('admin'), UserController.getAll)
router.get('/notifications', AuthMiddleware, UserController.getNotifications)
router.get('/:id', RoleMiddleware('admin'), UserController.getOne)
router.put('/', RoleMiddleware('admin'), UserController.update)
router.delete('/:id', RoleMiddleware('admin'), UserController.delete)

export default router