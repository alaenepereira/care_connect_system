import express from 'express'
import professionalRouter from './professional.routes.js'
import userRouter from './user.routes.js'

const router = express.Router()


router.use('/professional', professionalRouter)
router.use('/user', userRouter)

export default router