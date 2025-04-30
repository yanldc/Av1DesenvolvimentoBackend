const express = require('express');
const router = express.Router();
const passageiroController = require('../controller/passageiroController');
const passageiroValidator = require('../validator/passageiroValidator');

router.get('/passageiro', passageiroController.getPassageiro);
router.post('/passageiro', passageiroValidator.postPassageiroAction, passageiroController.postPassageiro)
router.put('/passageiro/:id', passageiroValidator.editPassageiroAction, passageiroController.editPassageiro )

module.exports = router;