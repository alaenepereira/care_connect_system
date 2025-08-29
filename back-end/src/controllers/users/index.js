import { PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET

const register = async (req, res) => {

  try {
    const { name, email, password, cpf } = req.body


    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

     const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    if (!cpf || cpf.replace(/\D/g, "").length !== 11) {
      return res.status(400).json({ message: "CPF inválido: deve conter 11 números" })
    }

    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        cpf
      }
      
    })

    res.status(201).json(createUser)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}

const login = async (req, res) => {
  try {
    const userInfo = req.body

    

    const user = await prisma.user.findUnique({
      where: {
        email: userInfo.email
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password)


    if (!isMatch) {
      return res.status(400).json({ message: 'Senha inválida' })
    }

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