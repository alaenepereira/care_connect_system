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
  const { id } = req.params;

   try{
    const IdAppointment= await prisma.appointment.findUnique({
      where:{
        id,
      },
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
    });
    if (!IdAppointment) {
      return res.status(404).json( 'Agendamento não encontrado.', 404);
    }
    return res.status(200).json(IdAppointment);

  } catch (error) {
    console.error(error);
    throw new AppError('Erro ao buscar o agendamento', 500);
  }
};


const updateAppointment = async (req, res) => {

  const { id } = req.params;
    const { data, status, value, observations } = req.body;
  try {
    

    const findAppointment = await prisma.appointment.findFirst({
      where: {
        id
      }
    })

    if (!findAppointment)  throw new AppError('Agendamento não encontrado', 404);

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        data: data ? new Date(data) : undefined,
        status,
        value,
        observations
      },
    });

    return res.status(200).json({
      message: 'Agendamento atualizado com sucesso',
      appointment: updatedAppointment,
    });
  } catch (error) {

    throw new AppError('Erro interno do servidor', 500);
  }
};
const deleteAppointment = async (req, res) => {
  const { id } = req.params

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) }
    })

    if (!appointment) {
      throw new AppError('Agendamento não encontrado', 404)
    }

    await prisma.appointment.delete({
      where: { id: Number(id) }
    })

    return res.status(200).json({ message: 'Agendamento deletado com sucesso' })
  } catch (error) {
    console.error(error)

    if (error?.code === 'P2025') {
      throw new AppError('Agendamento não encontrado', 404)
    }

    throw new AppError('Erro ao deletar o agendamento', 500)
  }
}

export default {
  create,
  listAll,
  listId,
  updateAppointment,
  deleteAppointment
}