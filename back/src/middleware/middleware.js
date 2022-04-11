const { getArray } = require("../utils/functions");
const conexao = require('../../db/conexao');
const jwtSecret = require('../utils/jwt_secret');
const jwt = require('jsonwebtoken');

function validateBody(req, res, next) {
    const array = getArray(req);
    const body = req.body;
    const keys = Object.keys(body);

    if (!array.length) {
        return res.status(500).json({ mensagem: `URL invalida` });
    }

    for (item of array) {
        if (!keys.includes(item)) {
            return res.status(400).json({ mensagem: `O campo ${item} é obrigatório` });
        }
        if (body[item].trim() == '') {
            return res.status(400).json({ mensagem: `O campo ${item} não pode ser vazio` });
        }
    }

    next();
}

async function validateEmail(req, res, next) {
    const { email } = req.body;
    try {
        const queryConsutaEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const { rowCount: quantidadeUsuarios } = await conexao.query(queryConsutaEmail, [email]);

        if (quantidadeUsuarios > 0) {
            return res.status(400).json({
                mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    next();
}

async function validateEmailLogin(req, res, next) {
    const { email } = req.body;
    try {
        const queryConsutaEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const { rowCount: quantidadeUsuarios } = await conexao.query(queryConsutaEmail, [email]);

        if (quantidadeUsuarios == 0) {
            return res.status(404).json({
                mensagem: 'Usuário e/ou senha inválido(s).'
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    next();
}

async function validateEmailAtualizar(req, res, next) {
    const { email } = req.body;
    const { id } = req.usuario;

    try {
        const queryConsultaEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const { rows, rowCount: quantidadeUsuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (quantidadeUsuarios > 0) {
            if (rows[0].id != id) {
                return res.status(400).json({
                    mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
                });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    next();
}

async function validateLogin(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(404).json({
            mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'
        });
    }
    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, jwtSecret);
        const queryConsultaUsuario = `SELECT * FROM usuarios WHERE id = $1`;
        const { rows, rowCount } = await conexao.query(queryConsultaUsuario, [id]);
        if (!rowCount) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }
        const { senha, ...usuario } = rows[0];
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json(error.mensagem);
    }
}

module.exports = {
    validateBody,
    validateEmail,
    validateEmailLogin,
    validateLogin,
    validateEmailAtualizar
};