import AppError from '../../errors/AppError.js'
import { PrismaClient } from '@prisma/client'
import professional from '../professional/index.js'

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

const listId = async(req,res)=>{
  try{ const { id } = req.params;
    const IdAppointment= await prisma.appointment.findUnique({
      where:{
        id:id,
      },
         include: {
        patient: {
          select: {
            id: true,
            name: true, 
          },
        },
        professional: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!IdAppointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }
    return res.status(200).json(IdAppointment);

  } catch (error) {
    console.error(error);
    throw new AppError('Erro ao buscar o agendamento', 500);
  }
};


export default {
  create,
  listAll,
  listId
}