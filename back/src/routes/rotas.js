const express = require('express');
const { cadastrarUsuario, detalharUsuario, login, atualizarUsuario } = require('../controller/usuario');
const { validateBody, validateEmail, validateEmailLogin, validateLogin, validateEmailAtualizar } = require('../middleware/middleware');

const rotas = express();

rotas.get('/usuario', validateLogin, detalharUsuario);
rotas.put('/usuario', validateBody, validateLogin, validateEmailAtualizar, atualizarUsuario);

rotas.post('/usuario', validateBody, validateEmail, cadastrarUsuario);
rotas.post('/login', validateBody, validateEmailLogin, login);

module.exports = rotas;