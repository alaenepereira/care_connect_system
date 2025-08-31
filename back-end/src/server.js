import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import AppError from './errors/AppError.js';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)

app.use((err, _req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (!err.statusCode) {
    return res.status(500).json({
      status: 'error',
      message: `Erro interno do servidor - ${err.message}`,
    });
  }

  return next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))