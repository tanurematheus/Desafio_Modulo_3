const { getArray } = require("../utils/functions");
const conexao = require('../../db/conexao');

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

module.exports = {
    validateBody,
    validateEmail
};