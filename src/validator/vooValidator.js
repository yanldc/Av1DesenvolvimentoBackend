const { checkSchema } = require('express-validator');

const validStatuses = ['programado', 'embarque', 'concluido'];

module.exports = {
  postVooAction: checkSchema({
    numeroVoo: {
      notEmpty: true,
      trim: true
    },
    origem: {
      notEmpty: true,
      errorMessage: 'Origem obrigatória'
    },
    destino: {
      notEmpty: true,
      errorMessage: 'Destino obrigatório'
    },
    dataHoraPartida: {
      notEmpty: true,
      isISO8601: true,
      errorMessage: 'Data de partida inválida'
    },
    portaoId: {
      notEmpty: true,
      errorMessage: 'portaoId é obrigatório'
    },
    status: {
      notEmpty: true,
      isIn: {
        options: [validStatuses],
        errorMessage: `Status inválido. Use: ${validStatuses.join(', ')}`
      }
    }
  }),

  editVooAction: checkSchema({
    status: {
      optional: true,
      isIn: {
        options: [validStatuses],
        errorMessage: `Status inválido. Use: ${validStatuses.join(', ')}`
      }
    }
  })
};
