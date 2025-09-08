import express from 'express'
import controlerPaciente from '../controllers/pacientes.js'
import userController from '../controllers/users/index.js'
const router = express.Router()

router.post("/pacientes",controlerPaciente.createPacientes);
router.get("/paciente", controlerPaciente.findPacientes);
router.get("/pacientes/:id",controlerPaciente.findPacientesId);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router
