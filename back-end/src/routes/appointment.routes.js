import express from 'express'
import consultation from '../controllers/appointments/index.js'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js'

const scheduleRouter = express.Router()

scheduleRouter.post('/create', consultation.create)
scheduleRouter.get('/listAll', consultation.listAll)
scheduleRouter.get('/listId/:id', consultation.listId)
scheduleRouter.put('/update/:id', ensureAuthenticated, consultation.updateAppointment)
scheduleRouter.delete('/delete/:id', ensureAuthenticated, consultation.deleteAppointment)



export default  scheduleRouter
