const express = require('express');
const { cadastrarUsuario, detalharUsuario, login, atualizarUsuario } = require('./controller/usuario');
const { validateBody, validateEmail, validateEmailLogin, validateLogin } = require('./middleware/middleware');

const rotas = express();

rotas.get('/usuario', validateLogin, detalharUsuario);
rotas.put('/usuario', validateBody, validateLogin, validateEmail, atualizarUsuario);

rotas.post('/usuario', validateBody, validateEmail, cadastrarUsuario);
rotas.post('/login', validateBody, validateEmailLogin, login);

module.exports = rotas;