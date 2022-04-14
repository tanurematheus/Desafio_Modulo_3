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

async function listarTransacoes(req, res) {
    const { id } = req.usuario;
    try {
        const queryListarTransacoes = `SELECT transacoes.id, transacoes.tipo, transacoes.descricao, transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id, categorias.descricao as categoria_nome FROM transacoes JOIN categorias ON transacoes.categoria_id = categorias.id WHERE transacoes.usuario_id = $1 ORDER BY transacoes.id`;
        const { rows: transacoes } = await conexao.query(queryListarTransacoes, [id]);
        if (transacoes.length > 0) {
            return res.status(200).json(
                transacoes
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

async function editarTransacao(req, res) {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id: idUsuario } = req.usuario;
    try {
        const queryEditarTransacao = `UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6 AND usuario_id = $7`;
        const { rowCount } = await conexao.query(queryEditarTransacao, [descricao, valor, data, categoria_id, tipo, id, idUsuario]);
        if (rowCount > 0) {
            return res.status(200).send();
        } else {
            return res.status(400).json({
                mensagem: 'Erro ao editar transação'
            });
        }
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
}

async function deletarTransacao(req, res) {
    const { id } = req.params;
    const { id: idUsuario } = req.usuario;
    try {
        const queryDeletarTransacao = `DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2`;
        const { rowCount } = await conexao.query(queryDeletarTransacao, [id, idUsuario]);
        if (rowCount > 0) {
            return res.status(200).send();
        } else {
            return res.status(400).json({
                mensagem: 'Erro ao deletar transação'
            });
        }
    } catch (error) {
        return res.status(500).json({
            erro: error.message
        });
    }
}

async function obterExtrato(req, res) {
    const { id: idUsuario } = req.usuario;
    try {
        const queryObterExtratoEntrada = `SELECT SUM(transacoes.valor) as valor_entrada FROM transacoes WHERE transacoes.tipo = 'entrada' AND transacoes.usuario_id = $1`;
        const { rows: extratoEntrada } = await conexao.query(queryObterExtratoEntrada, [idUsuario]);
        const queryObterExtratoSaida = `SELECT SUM(transacoes.valor) as valor_saida FROM transacoes WHERE transacoes.tipo = 'saida' AND transacoes.usuario_id = $1`;
        const { rows: extratoSaida } = await conexao.query(queryObterExtratoSaida, [idUsuario]);
        if (extratoEntrada.length > 0 && extratoSaida.length > 0) {
            return res.status(200).json(
                {
                    entrada: extratoEntrada[0].valor_entrada ? Number(extratoEntrada[0].valor_entrada) : 0,
                    saida: extratoSaida[0].valor_saida ? Number(extratoSaida[0].valor_saida) : 0
                }
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
    cadastrarTransacao,
    detalharTransacao,
    listarTransacoes,
    editarTransacao,
    deletarTransacao,
    obterExtrato
}