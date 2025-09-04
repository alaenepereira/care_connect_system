import express from 'express'
import patientController from '../controllers/patients/index.js'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js'

const patientRouter = express.Router()

patientRouter.post('/create', patientController.createPatient)
patientRouter.get('/listAll', patientController.listAllPatients)
patientRouter.get('/listId/:id', patientController.getPatientById)
patientRouter.put('/update/:id', ensureAuthenticated, patientController.updatePatient)
patientRouter.delete('/delete/:id', ensureAuthenticated, patientController.deletePatient)

export default patientRouter