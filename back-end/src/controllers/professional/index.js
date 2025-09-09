import { PrismaClient } from '@prisma/client'
import AppError from '../../errors/AppError.js'

const prisma = new PrismaClient()

const create = async (req, res) => {
  try {
    const { name, email, phone, specialty } = req.body

   
    if (!name || !email || !phone || !specialty) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

   
    const existingUser = await prisma.professional.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado' })
    }


    const createDoctor = await prisma.professional.create({
      data: { name, email, phone, specialty }
    })

    return res.status(201).json(createDoctor)

  } catch (error) {
    throw AppError(error.message, error.status)
  }
}

const listAll = async(_req, res) =>{

  const professionalList = await prisma.professional.findMany()
  return res.status(200).json({message: 'Lista de todos os profissionais', professionalList})
}

const listId = async(req, res) =>{

  const { id } = req.params

  const professional = await prisma.professional.findUnique({
    where: { id }
  })
  return res.status(200).json(professional)
}

const update = async(req,res) =>{
  const { id } = req.params
  const { name,specialty, phone} = req.body

   const findProfessional = await prisma.professional.findFirst({
      where: {
        id
      }
    })

    if (!findProfessional)  throw new AppError('Profissional não encontrado', 404);

  try {
    const updateCredentials = await prisma.professional.update({
     where: {id},
      data: {
        name,
        specialty,
          phone      
        }
       })

       return res.status(200).json({message: 'Profissional atualizado com sucesso', updateCredentials})
  } catch (error) {
    
    throw new AppError('Profissional não encontrado', 404)
  }
}

const Delete = async(req,res) =>{
  const { id } = req.params

  try {
    const deleteProfessional = await prisma.professional.delete({
      where: { id }
    })

    return res.status(200).json({message: 'Profissional deletado com sucesso', deleteProfessional})
  } catch (error) {
    throw new AppError(error.message, 500)
  }
}

export default {
create,
listAll,
listId,
update,
Delete
}
