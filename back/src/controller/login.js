const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../utils/jwt_secret');

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

module.exports = {
    login
};