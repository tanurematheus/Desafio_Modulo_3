const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../utils/jwt_secret');

async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const query = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)`;
        const params = [nome, email, senhaCriptografada];
        const usuarioCadastrados = await conexao.query(query, params);

        if (usuarioCadastrados.rowCount > 0) {
            const queryUsuario = `SELECT * FROM usuarios WHERE email = $1`;
            const usuario = await conexao.query(queryUsuario, [email]);
            console.log(usuario.rows[0]);
            return res.status(201).json({
                id: usuario.rows[0].id,
                nome: usuario.rows[0].nome,
                email: usuario.rows[0].email,
            });
        } else {
            return res.status(400).json({
                mensagem: 'Erro ao cadastrar usuário'
            });
        }

    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

}

async function login(req, res) {
    const { email, senha } = req.body;

    try {
        const queryConsultaEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const { rows: usuarios } = await conexao.query(queryConsultaEmail, [email]);
        const { senha: senhaUsuario, ...usuario } = usuarios[0];
        const senhaVerificada = await bcrypt.compare(senha, senhaUsuario);
        if (!senhaVerificada) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        } else {
            const token = jwt.sign({ id: usuario.id }, jwt_secret, {
                expiresIn: '1d'
            });
            return res.status(200).json({
                usuario,
                token
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function detalharUsuario(req, res) {
    try {
        return res.status(200).json(req.usuario);

    } catch (error) {
        return res.status(400).json({
            erro: error.mensagem
        });
    }
}

async function atualizarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;
    try {
        const query = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4`;
        const params = [nome, email, senha, id];
        const usuarioAtualizado = await conexao.query(query, params);
        if (usuarioAtualizado.rowCount === 0) {
            return res.status(400).json({
                mensagem: 'Erro ao atualizar usuário'
            });
        }
        return res.status(200).send();
    } catch (error) {
        return res.status(400).json(error.mensagem);
    }
}

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    login,
    atualizarUsuario
}