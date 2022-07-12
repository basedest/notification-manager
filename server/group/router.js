import Router from 'express'
import { RoleMiddleware } from '../user/auth/middleware.js'
import GroupController from './controller.js'

const router = new Router()

router.post('/', RoleMiddleware('admin'), GroupController.create)
router.get('/', RoleMiddleware('admin'), GroupController.getAll)
router.get('/:id', RoleMiddleware('admin'), GroupController.getOne)
router.put('/', RoleMiddleware('admin'), GroupController.update)
router.delete('/:id', RoleMiddleware('admin'), GroupController.delete)

export default router