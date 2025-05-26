const express = require('express');
const router = express.Router();
const passageiroController = require('../controller/passageiroController');
const passageiroValidator = require('../validator/passageiroValidator');
const relatorioController = require('../controller/relatorioController');

const vooController = require('../controller/vooController');
const vooValidator = require('../validator/vooValidator');

const portaoController = require('../controller/portaoController');
const portaoValidator = require('../validator/portaoValidator');

const funcionarioController = require('../controller/funcionarioController');
const funcionarioValidator = require('../validator/funcionarioValidator')

const authController = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const checkAdmin = require('../middlewares/checkAdmin');
const swagger = require('../config/swagger');

router.get('/passageiro', passageiroController.getPassageiro);
router.get('/passageiro/:vooId', passageiroController.getPassageiroByVoo);
router.post('/passageiro', passageiroValidator.postPassageiroAction, passageiroController.postPassageiro)
router.put('/passageiro/:id', passageiroValidator.editPassageiroAction, passageiroController.editPassageiro )
router.delete('/passageiro/:id', passageiroController.deletePassageiro )

router.get('/voo', vooController.getVoo);
router.delete('/voo/:id', vooController.deleteVoo )

router.get('/portao', portaoController.getPortao);
router.post('/portao', portaoValidator.postPortaoAction, portaoController.postPortao)
router.put('/portao/:id', portaoValidator.editPortaoAction, portaoController.editPortao )
router.delete('/portao/:id', portaoController.deletePortao )

router.get('/relatorio', relatorioController.getRelatorio);

router.post('/funcionario', funcionarioValidator.postFuncionarioAction, funcionarioController.postFuncionario)
router.post('/login', authController.login);

// Rota para documentação da API
router.use('/api-docs', swagger.serve, swagger.setup);

// Rotas protegidas por autenticação
router.use(authMiddleware)
router.post('/voo', vooValidator.postVooAction, vooController.postVoo)
router.put('/voo/:id', vooValidator.editVooAction, checkAdmin, vooController.editVoo )

module.exports = router;