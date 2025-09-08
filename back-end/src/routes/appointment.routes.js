import express from 'express'
import consultation from '../controllers/appointments/index.js'

const scheduleRouter = express.Router()

scheduleRouter.post('/create', consultation.create)
scheduleRouter.get('/listAll', consultation.listAll)
scheduleRouter.get('/listId', consultation.listId)

export default  scheduleRouter
