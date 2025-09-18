import AppError from '../../errors/AppError.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const create = async(req, res) => {
  const { data, status, value, observations, patientId, professionalId } = req.body

  try {
    // ✅ VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
    if (!data || !status || !patientId || !professionalId) {
      throw new AppError('Campos obrigatórios faltando: data, status, patientId, professionalId', 400)
    }

    // ✅ VALIDAR SE O STATUS É VÁLIDO (VALORES CORRETOS DO ENUM)
    const validStatuses = ['AGENDADA', 'CONCLUIDA', 'CANCELADA'];
    if (!validStatuses.includes(status)) {
      throw new AppError(`Status inválido. Use: ${validStatuses.join(', ')}`, 400)
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        data: new Date(data),
        status: status,
        value: value ? parseFloat(value) : null,
        observations: observations || '',
        patientId,
        professionalId
      },
      include: {
        Professional: {
          select: {
            name: true,
            specialty: true,
          },
        },
        patient: {
          select: {
            name: true,
            email: true
          }
        }
      },
    })

    return res.status(201).json({
      message: 'Agendamento criado com sucesso', 
      newAppointment
    })

  } catch (error) {
    console.error('Erro detalhado ao criar agendamento:', error)
    
    if (error.code === 'P2003') {
      return res.status(400).json({
        message: 'ID de paciente ou profissional inválido',
        error: 'Verifique se os IDs existem no banco de dados'
      })
    }
    
    throw new AppError('Erro ao criar o agendamento: ' + error.message, 500)
  }
}

const listAll = async(_req, res) => {
  try {
    const listAppointments = await prisma.appointment.findMany({
      include: {
        patient: {
          select: {
            name: true,
          },
        },
        Professional: {
          select: {
            name: true,
            specialty: true,
          },
        },
      },
      orderBy: {
        data: 'asc'
      }
    })
    
    return res.status(200).json({
      message: 'Lista de todas as consultas com seus respectivos profissionais', 
      listAppointments
    })
    
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error)
    throw new AppError('Erro ao listar todas as consultas: ' + error.message, 500)
  }
}

const listId = async(req, res) => {
  const { id } = req.params;

  try {
    const IdAppointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            name: true, 
          },
        },
        Professional: {
          select: {
            name: true,
            specialty: true
          },
        },
      },
    })
    
    if (!IdAppointment) {
      throw new AppError('Agendamento não encontrado', 404)
    }
    
    return res.status(200).json(IdAppointment)

  } catch (error) {
    console.error('Erro ao buscar agendamento:', error)
    throw new AppError('Erro ao buscar o agendamento: ' + error.message, 500)
  }
}

const updateAppointment = async (req, res) => {
  const { id } = req.params
  const { data, status, value, observations } = req.body

  try {
    const findAppointment = await prisma.appointment.findUnique({
      where: { id }
    })

    if (!findAppointment) {
      throw new AppError('Agendamento não encontrado', 404)
    }

    // ✅ VALIDAR STATUS SE FOR FORNECIDO
    if (status) {
      const validStatuses = ['AGENDADA', 'CONCLUIDA', 'CANCELADA'];
      if (!validStatuses.includes(status)) {
        throw new AppError(`Status inválido. Use: ${validStatuses.join(', ')}`, 400)
      }
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        data: data ? new Date(data) : undefined,
        status: status || undefined,
        value: value !== undefined ? parseFloat(value) : undefined,
        observations: observations !== undefined ? observations : undefined
      },
      include: {
        patient: {
          select: {
            name: true
          }
        },
        Professional: {
          select: {
            name: true,
            specialty: true
          }
        }
      }
    })

    return res.status(200).json({
      message: 'Agendamento atualizado com sucesso',
      appointment: updatedAppointment,
    })
    
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error)
    
    if (error.code === 'P2025') {
      throw new AppError('Agendamento não encontrado para atualização', 404)
    }
    
    throw new AppError('Erro ao atualizar agendamento: ' + error.message, 500)
  }
}

const deleteAppointment = async (req, res) => {
  const { id } = req.params

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    })

    if (!appointment) {
      throw new AppError('Agendamento não encontrado', 404)
    }

    await prisma.appointment.delete({
      where: { id }
    })

    return res.status(200).json({ 
      message: 'Agendamento deletado com sucesso' 
    })
    
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    
    if (error.code === 'P2025') {
      throw new AppError('Agendamento não encontrado para exclusão', 404)
    }
    
    throw new AppError('Erro ao deletar o agendamento: ' + error.message, 500)
  }
}

export default {
  create,
  listAll,
  listId,
  updateAppointment,
  deleteAppointment
}