const mongoose = require('mongoose')
mongoose.Promise = global.Promisse;

const modelSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    vooId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voo', 
        required: true
    },
    statusCheckIn:true,
});

const modelName = 'Passageiro'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else {
    module.exports = mongoose.model(modelName, modelSchema);
}