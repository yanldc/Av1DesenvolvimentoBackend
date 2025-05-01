const { checkSchema } = require('express-validator');

const postActionPortao = checkSchema({
  numeroVoo: {
    notEmpty: true,
    errorMessage: 'Número do voo é obrigatório'
  },
  origem: {
    notEmpty: true,
    isString: true,
    trim: true,
    errorMessage: 'Origem é obrigatória e deve ser uma string'
  },
  destino: {
    notEmpty: true,
    isString: true,
    trim: true,
    errorMessage: 'Destino é obrigatório e deve ser uma string'
  },
  dataHoraPartida: {
    notEmpty: true,
    isISO8601: true,
    toDate: true,
    errorMessage: 'Data do destino é obrigatória e deve ser uma data válida'
  },
  status: {
    notEmpty: true,
    isIn: {
      options: [['programado', 'embarque', 'concluido']]
    },
    errorMessage: 'Status deve ser "programado", "embarque" ou "concluido"'
  }
});

const editPortaoAction = checkSchema({
  numeroVoo: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Número do voo não pode ser vazio'
  },
  origem: {
    optional: true,
    notEmpty: true,
    isString: true,
    trim: true,
    errorMessage: 'Origem deve ser uma string válida'
  },
  destino: {
    optional: true,
    notEmpty: true,
    isString: true,
    trim: true,
    errorMessage: 'Destino deve ser uma string válida'
  },
  dataDestino: {
    optional: true,
    notEmpty: true,
    isISO8601: true,
    toDate: true,
    errorMessage: 'Data do destino deve ser uma data válida'
  },
  status: {
    optional: true,
    notEmpty: true,
    isIn: {
      options: [['programado', 'embarque', 'concluido']]
    },
    errorMessage: 'Status deve ser "programado", "embarque" ou "concluido"'
  }
});

module.exports = {
  postActionPortao,
  editPortaoAction
};
