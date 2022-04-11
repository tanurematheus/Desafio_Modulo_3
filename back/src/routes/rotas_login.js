const express = require('express');
const { login } = require('../controller/usuario');
const { validateBody, validateEmailLogin } = require('../middleware/middleware');

const rotas_login = express();

rotas_login.post('/login', validateBody, validateEmailLogin, login);

module.exports = rotas_login;