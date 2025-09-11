import React, { useState } from 'react';
import api from '../services/api';
import './RegisterPatient.css'; // Importe o arquivo CSS aqui

function RegisterPatient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateBirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/patient/create', formData);
      console.log('Paciente criado com sucesso!', response.data);
      alert('Paciente cadastrado!');
    } catch (error) {
      console.error('Erro ao cadastrar o paciente:', error.response.data);
      alert('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <div className="register-patient-container">
      <div className="register-patient-card">
        <h1>Cadastro de Paciente</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateBirth">Data de Nascimento:</label>
            <input type="date" id="dateBirth" name="dateBirth" value={formData.dateBirth} onChange={handleChange} required />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPatient;