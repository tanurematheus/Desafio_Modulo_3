const express = require('express');
const { cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('../controller/usuario');
const { validateBody, validateEmail, validateLogin, validateEmailAtualizar } = require('../middleware/middleware');

const rotas_usuario = express();

rotas_usuario.post('/usuario', validateBody, validateEmail, cadastrarUsuario);

rotas_usuario.use(validateLogin);
rotas_usuario.get('/usuario', detalharUsuario);
rotas_usuario.put('/usuario', validateBody, validateEmailAtualizar, atualizarUsuario);


module.exports = rotas_usuario;