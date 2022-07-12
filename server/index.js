import express from 'express'
import userRouter from './user/router.js'
import notificationRouter from './notification/router.js'
import groupRouter from './group/router.js'
import authRouter from './user/auth/router.js'

import cors from 'cors'
import 'dotenv/config'
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(cors())
app.use('/user', userRouter)
app.use('/notification', notificationRouter)
app.use('/group', groupRouter)
app.use('/auth', authRouter)

app.listen(port, () => console.log('app is listening on port ' + port))