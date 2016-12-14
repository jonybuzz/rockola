var express = require('express');
var router = express.Router();
var usuarioService = require('../private/service/usuarioService');

router.post('/rockola', function (req, res) {
    usuarioService.agregarRockola(req, res);
});

router.get('/obtenerRockolas', function (req, res) {
    res.json(req.user.rockolas);
});

module.exports = router;