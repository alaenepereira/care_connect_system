# ﻿⚙️ CareConnect API

CareConnect é uma API RESTful desenvolvida em Node.js com Express e Prisma ORM, criada para gerenciar pacientes, profissionais de saúde, usuários e consultas médicas.
O sistema garante segurança com JWT e integração com banco de dados relacional.

## 🌐 Visão Geral

A aplicação fornece endpoints para:

Cadastro e login de usuários

Gerenciamento de pacientes

Gerenciamento de profissionais

Agendamento de consultas

Controle de autenticação via JWT

## 🚀 Funcionalidades

### 👤 Usuários

Registro de novos usuários

Login com autenticação JWT

Proteção de rotas privadas

### 🧑‍⚕️ Profissionais

Cadastro de profissionais de saúde

Listagem de todos os profissionais

Consulta por ID

Atualização de dados

Exclusão de profissionais

### 😊 Pacientes

Cadastro de pacientes

Listagem de pacientes

Consulta por ID

Atualização de dados

Exclusão de pacientes

### 🗓️ Consultas

Criação de consulta vinculada a paciente e profissional

Listagem de todas as consultas

Consulta por ID

Atualização de agendamento (data, status, paciente, profissional)

Exclusão de consulta

## 🔗 API – Endpoints Principais
Usuários
POST   /users/register     # Criar usuário
POST   /users/login        # Login

## Profissionais
POST   /professionals/create
GET    /professionals/listAll
GET    /professionals/listId/:id
PUT    /professionals/update/:id
DELETE /professionals/delete/:id

## Pacientes
POST   /patients/create
GET    /patients/listAll
GET    /patients/listId/:id
PUT    /patients/update/:id
DELETE /patients/delete/:id

## Consultas
POST   /appointments/create
GET    /appointments/listAll
GET    /appointments/listId/:id
PUT    /appointments/update/:id
DELETE /appointments/delete/:id

### 🛡️ Autenticação

Após o login, o usuário recebe um token JWT.

Enviar o token no header Authorization para acessar rotas privadas.

Authorization: Bearer <seu_token>

## 🛠️ Tecnologias Utilizadas

Node.js – ambiente de execução

Express – framework web

Prisma ORM – ORM para banco de dados

PostgreSQL 

JWT – autenticação

dotenv – gerenciamento de variáveis de ambiente

Bcrypt – criptografia de senhas

### 📂 Estrutura de Pastas (resumida)
src/
├── controllers/   # Lógica das rotas
├── routes/        # Definição de endpoints
├── middlewares/   # Middlewares (auth, error handler)
├── utils/         # Funções auxiliares
└── prisma/        # Schema do banco

### ▶️ Como executar o projeto localmente
# Clone o repositório
git clone https://github.com/alaenepereira/careconnect-system
cd careconnect-system

# Instale as dependências
npm install

# Configure o .env
DATABASE_URL="sua_string_conexao"
JWT_SECRET="sua_chave_jwt"
PORT=3000

# Rode as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run dev

👨‍🏫 Projeto Educacional

Desenvolvido durante o Bootcamp de Desenvolvimento Fullstack – Capacita Brasil.

👩‍💻 Desenvolvido por:

- Alaene Silva
- Larissa Victória
- Samuel Albuquerque
- Romário Paixão
- Julianny Albuquerque

✨ Projeto backend para gestão de clínica médica com foco em organização, segurança e escalabilidade.


