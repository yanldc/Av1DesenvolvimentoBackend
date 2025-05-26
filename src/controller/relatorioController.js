const vooService = require('../service/vooService');
const passageiroService = require('../service/passageiroService');

module.exports = {
  getRelatorio: async (req, res) => {
    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const amanha = new Date(hoje);
      amanha.setDate(hoje.getDate() + 1);

      const voos = await vooService.findVoosDoDia(hoje, amanha);

      const relatorio = [];

      for (const voo of voos) {
        const passageiros = await passageiroService.getPassageirosPorVooId(voo._id);

        const passageirosFormatados = passageiros.map(p => ({
          nome: p.nome,
          cpf: p.cpf,
          statusCheckIn: p.statusCheckIn
        }));

        relatorio.push({
          numeroVoo: voo.numeroVoo,
          origem: voo.origem,
          destino: voo.destino,
          dataHoraPartida: voo.dataHoraPartida,
          passageiros: passageirosFormatados
        });
      }

      return res.status(200).json({ relatorio });
    } catch (err) {
      return res.status(err.status || 500).json({ 
        error: 'Erro ao gerar relatório', 
        detalhes: err.message 
      });
    }
  }
};