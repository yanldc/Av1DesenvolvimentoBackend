const mongoose = require('mongoose');
const passageiroRepository = require('../repository/passageiroRepository');
const vooRepository = require('../repository/vooRepository');

function validarCpf(cpf) {
  let sum = 0;
  let rest;

  const strCPF = String(cpf).replace(/[^\d]/g, '');
  if (strCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(strCPF)) return false;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(strCPF.charAt(i - 1)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(strCPF.charAt(i - 1)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.charAt(10))) return false;

  return true;
}

module.exports = {
  getAllPassageiros: async () => {
    try {
      return await passageiroRepository.findAllPassageiros();
    } catch (err) {
      const error = new Error(err.message);
      error.status = 500;
      throw error;
    }
  },

  createPassageiro: async (data) => {
    try {
      if (!validarCpf(data.cpf)) {
        const error = new Error('CPF inválido');
        error.status = 400;
        throw error;
      }

      const cpfExists = await passageiroRepository.findPassageiroByCpf(data.cpf);
      if (cpfExists) {
        const error = new Error('CPF já cadastrado');
        error.status = 400;
        throw error;
      }

      const voo = await vooRepository.findById(data.vooId);
      if (!voo) {
        const error = new Error('Voo não encontrado');
        error.status = 404;
        throw error;
      }
      
      if (voo.status !== 'embarque') {
        const error = new Error('Check-in só permitido quando voo estiver em embarque');
        error.status = 400;
        throw error;
      }

      const passageiroData = {
        nome: data.nome,
        cpf: data.cpf,
        vooId: new mongoose.Types.ObjectId(data.vooId),
        statusCheckIn: 'pendente',
      };

      return await passageiroRepository.createPassageiro(passageiroData);
    } catch (err) {
      if (!err.status) {
        err.status = 400;
      }
      throw err;
    }
  },

  editPassageiro: async (id, data) => {
    try {
      const updates = {};

      if (data.nome) updates.nome = data.nome;

      if (data.cpf) {
        const cpfExists = await passageiroRepository.findPassageiroByCpf(data.cpf);
        if (cpfExists && cpfExists._id.toString() !== id) {
          const error = new Error('CPF já existe em outra conta');
          error.status = 400;
          throw error;
        }
        if (!validarCpf(data.cpf)) {
          const error = new Error('CPF inválido');
          error.status = 400;
          throw error;
        }
        updates.cpf = data.cpf;
      }

      if (data.vooId) updates.vooId = new mongoose.Types.ObjectId(data.vooId);

      if (data.statusCheckIn) {
        if (data.statusCheckIn !== 'realizado') {
          const error = new Error('StatusCheckIn só pode ser "realizado" na edição');
          error.status = 400;
          throw error;
        }

        const passageiro = await passageiroRepository.findById(id);
        if (!passageiro) {
          const error = new Error('Passageiro não encontrado');
          error.status = 404;
          throw error;
        }

        const voo = await vooRepository.findById(passageiro.vooId);
        if (!voo) {
          const error = new Error('Voo associado não encontrado');
          error.status = 404;
          throw error;
        }

        if (voo.status !== 'embarque') {
          const error = new Error('Check-in só pode ser realizado se o voo estiver em embarque');
          error.status = 400;
          throw error;
        }

        updates.statusCheckIn = data.statusCheckIn;
      }

      return await passageiroRepository.updatePassageiroById(id, updates);
    } catch (err) {
      if (!err.status) {
        err.status = 400;
      }
      throw err;
    }
  },

  deletePassageiro: async (id) => {
    try {
      return await passageiroRepository.deletePassageiroById(id);
    } catch (err) {
      const error = new Error(err.message);
      error.status = 400;
      throw error;
    }
  },

  getPassageirosPorVooId: async (vooId) => {
    try {
      return await passageiroRepository.findAllPassageirosByVoo(vooId);
    } catch (err) {
      const error = new Error(err.message);
      error.status = 400;
      throw error;
    }
  }
};