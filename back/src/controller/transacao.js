const conexao = require('../../db/conexao');

async function cadastrarTransacao(req, res) {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.usuario;

    try {
        const queryCadastrarTransacao = `INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const params = [descricao, valor, data, categoria_id, id, tipo];
        const { rowCount, rows: transacaoCadastrada } = await conexao.query(queryCadastrarTransacao, params);
        if (rowCount > 0) {
            const queryJoinCategoriaTransacao = `SELECT transacoes.id, transacoes.tipo, transacoes.descricao, transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id, categorias.descricao as categoria_nome FROM transacoes JOIN categorias ON transacoes.categoria_id = categorias.id WHERE transacoes.id = $1`;
            const { rows: transacao } = await conexao.query(queryJoinCategoriaTransacao, [transacaoCadastrada[0].id]);
            return res.status(201).json(
                transacao[0]
            );
        } else {
            return res.status(400).json({
                mensagem: 'Erro ao cadastrar transação'
            });
        }
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
}

async function detalharTransacao(req, res) {
    const { id } = req.params;
    const { id: idUsuario } = req.usuario;
    try {
        const queryDetalharTransacao = `SELECT transacoes.id, transacoes.tipo, transacoes.descricao, transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id, categorias.descricao as categoria_nome FROM transacoes JOIN categorias ON transacoes.categoria_id = categorias.id WHERE transacoes.id = $1`;
        const { rows: transacao } = await conexao.query(queryDetalharTransacao, [id]);
        if (transacao.length > 0) {
            if (transacao[0].usuario_id == idUsuario) {
                return res.status(200).json(
                    transacao[0]
                );
            } else {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para acessar essa transação'
                });
            }
        } else {
            return res.status(404).json({
                mensagem: 'Transação não encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
}

module.exports = {
    cadastrarTransacao,
    detalharTransacao
}