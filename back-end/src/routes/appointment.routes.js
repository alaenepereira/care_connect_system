import express from 'express'
import consultation from '../controllers/appointments/index.js'

const scheduleRouter = express.Router()

scheduleRouter.post('/create', consultation.create)
scheduleRouter.get('/listAll', consultation.listAll)
scheduleRouter.put('/update/:id', consultation.updateAppointment)



export default  scheduleRouter
