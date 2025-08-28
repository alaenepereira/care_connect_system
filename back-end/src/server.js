import express from 'express'
import cors from 'cors'
import routes from './routes/user.routes.js'
import AppError from './errors/AppError.js';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)

app.use((err, _request, response, next) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({ message: err.message})
  }

  if (!err.statusCode) {
    return response.status(500).json({
      status: 'error',
      message: `Erro interno do servidor - ${err.message}`,
    });
  }
  return next();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))