import express from 'express'
import userController from '../controllers/users/index.js'

const userRouter = express.Router()

userRouter.post('/register', userController.register) // ← SEM ESPAÇO
userRouter.post('/login', userController.login) // ← SEM ESPAÇO

export default userRouter