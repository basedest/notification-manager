import Router from 'express'
import { check } from 'express-validator'
import AuthController from './controller.js'

const router = new Router()

router.post('/register', [
    check('username', "Username cannot be empty").notEmpty(),
    check('password', "Password should be from 4 to 10 symbols").isLength({min:4, max:10})
], AuthController.register)
router.post('/login', AuthController.login)

export default router