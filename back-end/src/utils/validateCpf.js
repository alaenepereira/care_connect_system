import AppError from '../errors/AppError.js';

const validateCPF = (cpf) => {
if (!cpf || cpf.replace(/\D/g, "").length !== 11) {
  throw new AppError("CPF inválido: deve conter 11 números", 400)
    }
};

export default validateCPF;