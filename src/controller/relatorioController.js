const passageiroService = require('../service/passageiroService');
const vooService = require('../service/vooService');
const portaoService = require('../service/portaoService');

module.exports = {
  getRelatorio: async (req, res) => {
    try {
      const passageiros = await passageiroService.getAllPassageiros();
      const voos = await vooService.getAllVoos();
      const portoes = await portaoService.getAllPortaos();

      return res.status(200).json({
        relatorio: {
          passageiros,
          voos,
          portoes
        }
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao gerar relatório', detalhes: err.message });
    }
  }
};
