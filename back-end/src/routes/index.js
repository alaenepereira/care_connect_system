import express from 'express'
import professionalRouter from './professional.routes.js'
import userRouter from './user.routes.js'
import patientRouter from './patient.routes.js'

const router = express.Router()


router.use('/professional', professionalRouter)
router.use('/user', userRouter)
router.use('/patient', patientRouter) 

export default router