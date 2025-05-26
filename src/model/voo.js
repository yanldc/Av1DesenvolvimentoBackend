const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    numeroVoo: Number,
    origem: String,
    destino: String,
    dataHoraPartida: Date,
    portaoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portao', 
        required: true
    },
    status: String,
});

const modelName = 'Voo'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else {
    module.exports = mongoose.model(modelName, modelSchema);
}