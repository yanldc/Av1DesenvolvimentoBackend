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
    return await passageiroRepository.findAllPassageiros();
  },

  createPassageiro: async (data) => {
    if (!validarCpf(data.cpf)) {
      throw new Error('CPF inválido');
    }

    const cpfExists = await passageiroRepository.findPassageiroByCpf(data.cpf);
    if (cpfExists) throw new Error('CPF já cadastrado');

    const voo = await vooRepository.findById(data.vooId);
    if (!voo) throw new Error('Voo não encontrado');
    if (voo.status !== 'embarque') {
      throw new Error('Check-in só permitido quando voo estiver em embarque');
    }

    const passageiroData = {
      nome: data.name,
      cpf: data.cpf,
      vooId: data.vooId,
      statusCheckIn: 'pendente',
    };

    return await passageiroRepository.createPassageiro(passageiroData);
  },

  editPassageiro: async (id, data) => {
    const updates = {};

    if (data.nome) updates.nome = data.nome;

    if (data.cpf) {
      const cpfExists = await passageiroRepository.findPassageiroByCpf(data.cpf);
      if (cpfExists) throw new Error('CPF já existe em outra conta');
      if (!validarCpf(data.cpf)) throw new Error('CPF inválido');
      updates.cpf = data.cpf;
    }

    if (data.vooId) updates.vooId = data.vooId;

    if (data.statusCheckIn) {
      if (data.statusCheckIn !== 'realizado') {
        throw new Error('StatusCheckIn só pode ser "realizado" na edição');
      }
      updates.statusCheckIn = data.statusCheckIn;
    }

    return await passageiroRepository.updatePassageiroById(id, updates);
  },

  deletePassageiro: async (id) => {
        return await passageiroRepository.deletePassageiroById(id);
      },
};
