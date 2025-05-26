const { checkSchema } = require('express-validator');

module.exports = {
  postPassageiroAction: checkSchema({
    nome: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: "Nome precisa de pelo menos 2 caracteres"
    },
    cpf: {
      notEmpty: true,
      errorMessage: 'CPF Obrigatório'
    },
    vooId: {
      notEmpty: true,
      errorMessage: 'vooId é obrigatório'
    },
  }),

  editPassageiroAction: checkSchema({
    nome: {
      optional: true,
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: "Nome precisa de pelo menos 2 caracteres"
    },
    cpf: {
      optional: true,
      notEmpty: true,
      errorMessage: 'CPF Obrigatório'
    },
    vooId: {
      optional: true,
      notEmpty: true,
      errorMessage: 'vooId não pode ser vazio'
    },
    statusCheckIn: {
      optional: true,
      custom: {
        options: (value) => {
          if (value !== 'realizado') {
            throw new Error('statusCheckIn só pode ser "realizado"');
          }
          return true;
        }
      }
    }
  })
};