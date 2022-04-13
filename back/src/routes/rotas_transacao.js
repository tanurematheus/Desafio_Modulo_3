const express = require('express');
const { cadastrarTransacao, detalharTransacao, listarTransacoes, editarTransacao, deletarTransacao } = require('../controller/transacao');
const { validateLogin, validateBody, validateCategoria } = require('../middleware/middleware');

const rotas_transacao = express();

rotas_transacao.post('/transacao', validateLogin, validateBody, validateCategoria, cadastrarTransacao);

rotas_transacao.get('/transacao', validateLogin, listarTransacoes);
rotas_transacao.get('/transacao/:id', validateLogin, detalharTransacao);

rotas_transacao.put('/transacao/:id', validateLogin, validateBody, validateCategoria, editarTransacao);

rotas_transacao.delete('/transacao/:id', validateLogin, deletarTransacao);

module.exports = rotas_transacao;