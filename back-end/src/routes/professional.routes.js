import express from 'express'
import occupational from '../controllers/professional/index.js'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js'

const professionalRouter = express.Router()

professionalRouter.post('/create', occupational.create)
professionalRouter.get('/listAll', occupational.listAll)
professionalRouter.get('/listId/:id', occupational.listId)
professionalRouter.put('/update/:id', ensureAuthenticated, occupational.update )
professionalRouter.delete('/delete/:id', ensureAuthenticated, occupational.Delete)

export default professionalRouter