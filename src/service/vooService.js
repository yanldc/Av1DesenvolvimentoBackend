const vooRepository = require('../repository/vooRepository');

module.exports = {
    getAllVoos: async () => {
        return await vooRepository.findAllvoos();
    },

    createvoo: async (data) => {
        const vooData = {
            nome: data.nome,
            origem: data.origem,
            destino: data.destino,
            vooId: data.vooId,
            statusCheckIn: 'pendente' 
        };

        return await vooRepository.createvoo(vooData);
    },

    editvoo: async (id, data) => {
        const updates = {};

        if (data.nome) updates.nome = data.nome;

        if (data.cpf) {
            const cpfExists = await vooRepository.findvooByCpf(data.cpf);
            if (cpfExists) throw new Error('CPF já existe em outra conta');
            updates.cpf = data.cpf;
        }

        if (data.vooId) updates.vooId = data.vooId;

        if (data.statusCheckIn) {
            if (data.statusCheckIn !== 'realizado') {
                throw new Error('Status de check-in só pode ser "realizado"');
            }
            updates.statusCheckIn = 'realizado';
        }

        return await vooRepository.updatevooById(id, updates);
    }
};
