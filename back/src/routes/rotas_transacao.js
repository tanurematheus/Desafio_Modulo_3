const express = require('express');
const { cadastrarTransacao } = require('../controller/transacao');
const { validateLogin, validateBody, validateCategoria } = require('../middleware/middleware');

const rotas_transacao = express();

rotas_transacao.post('/transacao', validateLogin, validateBody, validateCategoria, cadastrarTransacao);

module.exports = rotas_transacao;