const express = require('express');
const { cadastrarTransacao, detalharTransacao, listarTransacoes, editarTransacao, deletarTransacao, obterExtrato } = require('../controller/transacao');
const { validateLogin, validateBody, validateCategoria } = require('../middleware/middleware');

const rotas_transacao = express();

rotas_transacao.use(validateLogin);

rotas_transacao.post('/transacao', validateBody, validateCategoria, cadastrarTransacao);

rotas_transacao.get('/transacao', listarTransacoes);
rotas_transacao.get('/transacao/extrato', obterExtrato);
rotas_transacao.get('/transacao/:id', detalharTransacao);

rotas_transacao.put('/transacao/:id', validateBody, validateCategoria, editarTransacao);

rotas_transacao.delete('/transacao/:id', deletarTransacao);

module.exports = rotas_transacao;