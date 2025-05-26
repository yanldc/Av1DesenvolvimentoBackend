const { checkSchema } = require('express-validator');
const moment = require('moment');

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
      custom: {
        options: (value) => {
          const date = moment(value, 'DD-MM-YYYY HH:mm', true);
          if (!date.isValid()) return false;
          // Convert to JavaScript Date for MongoDB
          return true;
        },
        errorMessage: 'Data de partida inválida'
      }
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
    numeroVoo: {
      optional: true,
      notEmpty: true,
      trim: true
    },
    origem: {
      optional: true,
      notEmpty: true,
      errorMessage: 'Origem obrigatória'
    },
    destino: {
      optional: true,
      notEmpty: true,
      errorMessage: 'Destino obrigatório'
    },
    dataHoraPartida: {
      optional: true,
      notEmpty: true,
      custom: {
        options: (value) => {
          const date = moment(value, 'DD-MM-YYYY HH:mm', true);
          if (!date.isValid()) return false;
          // Convert to JavaScript Date for MongoDB
          return true;
        },
        errorMessage: 'Data de partida inválida'
      }
    },
    portaoId: {
      optional: true,
      notEmpty: true,
      errorMessage: 'portaoId é obrigatório'
    },
    status: {
      optional: true,
      notEmpty: true,
      isIn: {
        options: [validStatuses],
        errorMessage: `Status inválido. Use: ${validStatuses.join(', ')}`
      }
    }
  })
};