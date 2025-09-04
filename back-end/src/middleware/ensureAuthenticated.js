import jwt from 'jsonwebtoken'
import AppError from '../errors/AppError.js'



const ensureAuthenticated = async (req, res, next ) => {
  const authHeader = req.headers.authorization;
   const secret = process.env.JWT_SECRET

if(!authHeader){
    throw new AppError('Token Invalido', 401)
  }

  const [, token] = authHeader.split(' ');

  try {
   
   const decoded = jwt.verify(token, secret)

   req.userId = decoded.id
    next()
  } catch (error) {
    console.log(error)
    throw new AppError({ message: 'Token Inválido'}, 401);
  }

}

export {
ensureAuthenticated
} 