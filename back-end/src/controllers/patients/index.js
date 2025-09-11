import { PrismaClient } from '@prisma/client'
import AppError from '../../errors/AppError.js'

const prisma = new PrismaClient()

const createPatient = async (req, res) => {
  try {
    const { name, email, phone, dateBirth } = req.body

    if (!name || !email || !phone || !dateBirth) {
      throw new AppError('Todos os campos são obrigatórios', 400)
    }

    
    const existingPatient = await prisma.patient.findUnique({
      where: { email }
    })

    if (existingPatient) {
      throw new AppError('Email já cadastrado', 400)
    }

    const newPatient = await prisma.patient.create({
      data: {
        name,
        email,
        phone,
        dateBirth: new Date(dateBirth)
      }
    })

    return res.status(201).json({
      message: 'Paciente criado com sucesso',
      patient: newPatient
    })

  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Erro interno do servidor', 500)
  }
}

const listAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany()

    return res.status(200).json(patients)
  } catch (error) {
    throw new AppError('Erro ao buscar pacientes', 500)
  }
}

const getPatientById = async (req, res) => {

   const { id } = req.params
  try {
   
    const patient = await prisma.patient.findUnique({
      where: { id },
     })

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404)
    }

    return res.status(200).json(patient)
  } catch (error) {
   throw new AppError('Erro interno do servidor', 500)
    }
}

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, } = req.body

     const findPatient = await prisma.patient.findFirst({
      where: {
        id
      }
    })

    if (!findPatient)  throw new AppError('Paciente não encontrado', 404);

    
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        
      },
      })

    return res.status(200).json({
      message: 'Paciente atualizado com sucesso',
      patient: updatedPatient
    })

  } catch (error) {
    throw new AppError('Erro interno do servidor', 500)
  }
}

const deletePatient = async (req, res) => {
  const { id } = req.params
  try {

    const existingPatient = await prisma.patient.findUnique({
      where: { id }
    })

    if (!existingPatient) {
      throw new AppError('Paciente não encontrado', 404)
    }

    await prisma.patient.delete({
      where: { id }
    })

    return res.status(200).json({
      message: 'Paciente deletado com sucesso'
    })

  } catch (error) {
    
    throw new AppError('Erro interno do servidor', 500)
  }
}

export default {
  createPatient,
  listAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
}