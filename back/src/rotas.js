const express = require('express');
const { cadastrarUsuario } = require('./controller/cadastro');
const detalharUsuario = require('./controller/detalhar_usuario');
const { login } = require('./controller/login');
const { validateBody, validateEmail, validateEmailLogin, validateLogin } = require('./middleware/middleware');

const rotas = express();

rotas.get('/usuario', validateLogin, detalharUsuario);

rotas.post('/usuario', validateBody, validateEmail, cadastrarUsuario);
rotas.post('/login', validateBody, validateEmailLogin, login);

module.exports = rotas;