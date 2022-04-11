async function detalharUsuario(req, res) {
    try {
        return res.status(200).json(req.usuario);

    } catch (error) {
        return res.status(400).json({
            erro: error.mensagem
        });
    }
}

module.exports = detalharUsuario;