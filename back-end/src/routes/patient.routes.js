import express from 'express'
import patientController from '../controllers/patients/index.js'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js'

const patientRouter = express.Router()

patientRouter.post('/create', ensureAuthenticated, patientController.createPatient)
patientRouter.get('/listAll', ensureAuthenticated, patientController.listAllPatients)
patientRouter.get('/listId/:id', ensureAuthenticated, patientController.getPatientById)
patientRouter.put('/update/:id', ensureAuthenticated, patientController.updatePatient)
patientRouter.delete('/delete/:id', ensureAuthenticated, patientController.deletePatient)

export default patientRouter