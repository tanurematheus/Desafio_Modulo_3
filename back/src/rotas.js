const express = require('express');
const { cadastrarUsuario } = require('./controller/cadastro');
const { login } = require('./controller/login');
const { validateBody, validateEmail, validateEmailLogin } = require('./middleware/middleware');

const rotas = express();

rotas.post('/usuario', validateBody, validateEmail, cadastrarUsuario);
rotas.post('/login', validateBody, validateEmailLogin, login);

module.exports = rotas;