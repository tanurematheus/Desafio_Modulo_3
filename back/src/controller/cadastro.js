const conexao = require('../../db/conexao');
const bcrypt = require('bcrypt');

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

module.exports = {
    cadastrarUsuario
}