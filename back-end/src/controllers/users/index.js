import { PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validateCPF from "../../utils/validateCpf.js";

const prisma = new PrismaClient();


const register = async (req, res) => {

  try {
    const { name, email, password, CPF} = req.body


    if (!name || !email || !password || !CPF) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) throw new AppError('Email já cadastrado!', 409);
    
   const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

      validateCPF(CPF)

 const createUser = await prisma.user.create({
      data: {
        name,
        email,
        cpf: CPF,
        password: hash
        
      }
      
    })

    res.status(201).json(createUser)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}

const login = async (req, res) => {

  try {
      const JWT_SECRET = process.env.JWT_SECRET
      
    const userInfo = req.body

    const user = await prisma.user.findUnique({
      where: {
        email: userInfo.email
      }
    })

    if (!user) throw new AppError('Usuário não encontrado', 404)
    
    const isMatch = await bcrypt.compare(userInfo.password, user.password)

      if (!isMatch) throw new AppError('Usuário ou senha inválidos!', 401)
      
     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' })

       res.status(200).json(token)
  } catch (error) {
     throw new AppError(error.message, error.statusCode)
  }
}

export default {
  register,
  login
}