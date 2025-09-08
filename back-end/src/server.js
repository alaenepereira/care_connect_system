import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import AppError from './errors/AppError.js';

const app = express();

app.use(cors())
app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'API está funcionando!', timestamp: new Date().toISOString() })
});

app.use(routes)


app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error('Erro não tratado:', err);

  if (!err.statusCode) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor',
    });
  }

  return next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`))