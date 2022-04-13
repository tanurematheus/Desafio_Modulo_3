const conexao = require('../../db/conexao');

async function listarCategorias(req, res) {
    try {
        const queryListarCategorias = `SELECT * FROM categorias`;
        const { rows: categorias } = await conexao.query(queryListarCategorias);
        if (categorias.length > 0) {
            return res.status(200).json(
                categorias
            );
        } else {
            return res.status(200).json(
                []
            );
        }
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
}

module.exports = {
    listarCategorias
}