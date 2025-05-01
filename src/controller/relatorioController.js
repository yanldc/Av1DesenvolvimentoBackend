const Voo = require('../model/voo');
const Passageiro = require('../model/passageiro');

function getTodayDateRange() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return { start, end };
}

module.exports = {
    getRelatorioDiario: async (req, res) => {
        try {
            const { start, end } = getTodayDateRange();

            const voos = await Voo.find({
                dataHoraPartida: { $gte: start, $lte: end }
            }).lean();

            const vooIds = voos.map(voo => voo._id);
            const passageiros = await Passageiro.find({
                vooId: { $in: vooIds }
            }).lean();

            const passageirosPorVoo = passageiros.reduce((acc, passageiro) => {
                const vooId = passageiro.vooId.toString();
                if (!acc[vooId]) acc[vooId] = [];
                acc[vooId].push({
                    nome: passageiro.nome,
                    cpf: passageiro.cpf,
                    statusCheckIn: passageiro.statusCheckIn
                });
                return acc;
            }, {});

            const relatorio = voos.map(voo => ({
                numeroVoo: voo.numeroVoo,
                origem: voo.origem,
                destino: voo.destino,
                dataHoraPartida: voo.dataHoraPartida,
                status: voo.status,
                totalPassageiros: (passageirosPorVoo[voo._id.toString()] || []).length,
                passageiros: passageirosPorVoo[voo._id.toString()] || []
            }));

            res.json(relatorio);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            res.status(500).json({ erro: 'Erro ao gerar relatório' });
        }
    }
};
