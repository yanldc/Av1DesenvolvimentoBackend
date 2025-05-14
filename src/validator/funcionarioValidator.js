const {checkSchema} = require('express-validator')

module.exports = {
    postFuncionarioAction: checkSchema({
        name:{
            notEmpty: true,
            trim: true,
            isLength:{
                options:{min:2}
            },
            errorMessage: "Nome precisa de pelo menos 2 caracteres"
        },
        email:{
            notEmpty: true,
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'Email invalido'
        },
        password:{
            notEmpty: true,
            isLength:{
                options:{min:6}
            },
            errorMessage:"A senha precisa de pelo menos 6 caracteres"
        },

        cargo: {
            notEmpty: true,
            trim: true,
            isIn: {
                options: [['admin', 'servidor']],
                errorMessage: 'Cargo deve ser "admin" ou "servidor"'
            }
        }
    }),
}