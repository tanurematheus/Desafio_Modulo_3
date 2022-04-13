const express = require('express');
const { listarCategorias } = require('../controller/categoria');
const { validateLogin } = require('../middleware/middleware');

const rotas_categoria = express();

rotas_categoria.get('/categoria', validateLogin, listarCategorias);

module.exports = rotas_categoria;