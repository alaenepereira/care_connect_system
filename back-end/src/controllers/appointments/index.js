import AppError from '../../errors/AppError.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const create = async(req, res) => {

  const { data, status, value, observations, patientId, professionalId} = req.body

  try {
    const newAppointment = await prisma.appointment.create({

    data: {
      data: new Date(data),
      status,
      value,
     observations,
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
        select:{
           name: true,
           email:true
        }
       
      }
  },
  })

  return res.status(201).json({message: 'Agendamento criado com sucesso', newAppointment})

  } catch (error) {
    throw new AppError('Erro ao criar ao agendamento', 500)
  }

  
}

const listAll = async(_req,res) => {

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
    })
  return res.status(200).json({message: 'lista de todas as consultas com seus respectivos profissionais', listAppointments})
  } catch (error) {
    console.log(error)
    throw new AppError('Erro ao listar todas as consultas', 500)
  }
  
}

export default {
  create,
  listAll
}