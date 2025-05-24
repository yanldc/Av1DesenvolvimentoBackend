const mongoose = require('mongoose')
mongoose.Promise = global.Promisse;

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cargo: String,
});

const modelName = 'Funcionario'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else {
    module.exports = mongoose.model(modelName, modelSchema);
}