const express = require('express');
const { cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('../controller/usuario');
const { validateBody, validateEmail, validateLogin, validateEmailAtualizar } = require('../middleware/middleware');

const rotas_usuario = express();

rotas_usuario.get('/usuario', validateLogin, detalharUsuario);
rotas_usuario.put('/usuario', validateBody, validateLogin, validateEmailAtualizar, atualizarUsuario);

rotas_usuario.post('/usuario', validateBody, validateEmail, cadastrarUsuario);

module.exports = rotas_usuario;