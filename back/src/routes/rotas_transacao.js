const express = require('express');
const { cadastrarTransacao, detalharTransacao } = require('../controller/transacao');
const { validateLogin, validateBody, validateCategoria } = require('../middleware/middleware');

const rotas_transacao = express();

rotas_transacao.post('/transacao', validateLogin, validateBody, validateCategoria, cadastrarTransacao);
rotas_transacao.get('/transacao/:id', validateLogin, detalharTransacao);

module.exports = rotas_transacao;