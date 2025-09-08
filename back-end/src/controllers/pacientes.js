import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função para criar um novo paciente
const createPacientes = async (req, res) => {
    try {
        const { name, email, phone, dateBirth } = req.body;
        
        const paciente = await prisma.patient.create({
            data: {
                name,
                email,
                phone,
                dateBirth: new Date(dateBirth),
            },
        });
        
        return res.status(201).json({ message: `Paciente ${name} criado com sucesso`, paciente });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar paciente." });
    }
};


const findPacientes = async (req, res) => {
    try {
        const pacientesall = await prisma.patient.findMany();
        return res.status(200).json(pacientesall);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar pacientes." });
    }
};

// Função para encontrar um paciente por ID
const findPacientesId = async (req, res) => {
    try {
        const { id } = req.params;
        
        const paciente = await prisma.patient.findUnique({
            where: { id: parseInt(id) },
        });

        if (paciente) {
            return res.status(200).json(paciente);
        } else {
            return res.status(404).json({ mensagem: "Paciente não encontrado." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar paciente por ID." });
    }
};

export default {
    createPacientes,
    findPacientes,
    findPacientesId,
};