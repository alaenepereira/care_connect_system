import express from 'express'
import userController from '../controllers/users/index.js'
import occupational from '../controllers/professional/index.js'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js'
const router = express.Router()


router.post('/register', userController.register )
router.post('/login', userController.login)

router.post('/doctor/create', occupational.create)
router.get('/doctor/listAll', occupational.listAll)
router.get('/doctor/listId/:id', occupational.listId)
router.put('/doctor/update/:id', ensureAuthenticated, occupational.update )

export default router