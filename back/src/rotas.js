const express = require('express');
const { cadastrarUsuario } = require('./controller/cadastro');
const { validateBody, validateEmail } = require('./middleware/middleware');

const rotas = express();

rotas.post('/usuario', validateBody, validateEmail, cadastrarUsuario)

module.exports = rotas;