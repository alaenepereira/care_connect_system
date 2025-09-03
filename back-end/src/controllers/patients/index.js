import { PrismaClient } from '@prisma/client'
import AppError from '../../errors/AppError.js'

const prisma = new PrismaClient()

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, dateBirth } = req.body

    // Verificar se o paciente existe
    const existingPatient = await prisma.patient.findUnique({
      where: { id }
    })

    if (!existingPatient) {
      throw new AppError('Paciente não encontrado', 404)
    }

    // Validar dados obrigatórios
    if (!name || !email || !phone || !dateBirth) {
      throw new AppError('Nome, email, telefone e data de nascimento são obrigatórios', 400)
    }

    // Verificar se o email já está em uso por outro paciente
    if (email !== existingPatient.email) {
      const emailExists = await prisma.patient.findFirst({
        where: {
          email,
          id: { not: id }
        }
      })

      if (emailExists) {
        throw new AppError('Email já está em uso por outro paciente', 400)
      }
    }

    // Atualizar o paciente
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        dateBirth: new Date(dateBirth)
      },
      include: {
        appointment: {
          include: {
            Professional: true
          }
        }
      }
    })

    return res.status(200).json({
      message: 'Paciente atualizado com sucesso',
      patient: updatedPatient
    })

  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Erro interno do servidor', 500)
  }
}

const createPatient = async (req, res) => {
  try {
    const { name, email, phone, dateBirth } = req.body

    if (!name || !email || !phone || !dateBirth) {
      throw new AppError('Todos os campos são obrigatórios', 400)
    }

    // Verificar se email já existe
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
    const patients = await prisma.patient.findMany({
      include: {
        appointment: {
          include: {
            Professional: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return res.status(200).json(patients)
  } catch (error) {
    throw new AppError('Erro ao buscar pacientes', 500)
  }
}

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        appointment: {
          include: {
            Professional: true
          }
        }
      }
    })

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404)
    }

    return res.status(200).json(patient)
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Erro interno do servidor', 500)
  }
}

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar se o paciente existe
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
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Erro interno do servidor', 500)
  }
}

export default {
  updatePatient,
  createPatient,
  listAllPatients,
  getPatientById,
  deletePatient
}