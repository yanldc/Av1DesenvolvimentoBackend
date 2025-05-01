const mongoose = require('mongoose')
mongoose.Promise = global.Promisse;

const modelSchema = new mongoose.Schema({
    codigo: String,
    disponivel: Boolean,
});

const modelName = 'Portao'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else {
    module.exports = mongoose.model(modelName, modelSchema);
}