const passageiroRepository = require('../repository/passageiroRepository');

module.exports = {
    getAllPassageiros: async () => {
        return await passageiroRepository.findAllPassageiros();
    },

    createPassageiro: async (data) => {
        const isValidCpf = (cpf) => {
            let sum = 0;
            let rest;
            const strCPF = String(cpf).replace(/[^\d]/g, '');

            if (strCPF.length !== 11) return false;

            if (
                [
                    '00000000000',
                    '11111111111',
                    '22222222222',
                    '33333333333',
                    '44444444444',
                    '55555555555',
                    '66666666666',
                    '77777777777',
                    '88888888888',
                    '99999999999',
                ].includes(strCPF)
            ) {
                return false;
            }

            for (let i = 1; i <= 9; i++) {
                sum += parseInt(strCPF.charAt(i - 1)) * (11 - i);
            }
            rest = (sum * 10) % 11;
            if (rest === 10 || rest === 11) rest = 0;
            if (rest !== parseInt(strCPF.charAt(9))) return false;

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum += parseInt(strCPF.charAt(i - 1)) * (12 - i);
            }
            rest = (sum * 10) % 11;
            if (rest === 10 || rest === 11) rest = 0;
            if (rest !== parseInt(strCPF.charAt(10))) return false;

            return true;
        };

        if (!isValidCpf(data.cpf)) {
            throw new Error('The CPF is not valid.');
        }

        const cpfExists = await passageiroRepository.findPassageiroByCpf(data.cpf);
        if (cpfExists) throw new Error('CPF já cadastrado');

        const passageiroData = {
            nome: data.nome,
            cpf: data.cpf,
            vooId: data.vooId,
            statusCheckIn: 'pendente'  
        };

        return await passageiroRepository.createPassageiro(passageiroData);
    },

    editPassageiro: async (id, data) => {
        const updates = {};

        if (data.nome) updates.nome = data.nome;

        if (data.cpf) {
            const cpfExists = await passageiroRepository.findPassageiroByCpf(data.cpf);
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

        return await passageiroRepository.updatePassageiroById(id, updates);
    }
};
