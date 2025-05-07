const { checkSchema } = require('express-validator');

module.exports = {
  postPortaoAction: checkSchema({
    codigo: {
      notEmpty: true,
      trim: true,
    },
    disponivel: {
      notEmpty: true,
      isBoolean: true,
    },

  }),

  editPortaoAction: checkSchema({
    codigo: {
        optional: true,
        notEmpty: true,
        trim: true,
      },
      disponivel: {
        optional: true,
        notEmpty: true,
        isBoolean: true,
      },
  })
};