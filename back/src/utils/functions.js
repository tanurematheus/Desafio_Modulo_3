function getArray(req) {
    let array = [];
    switch (req.url) {
        case '/usuario':
            array = ['nome', 'email', 'senha'];
            break;
        case '/login':
            array = ['email', 'senha'];
            break;
        case '/transacao':
        case `/transacao/${req.params.id}`:
            array = ['descricao', 'valor', 'data', 'categoria_id', 'tipo'];
        default:
            break;
    }
    return array;
}

module.exports = {
    getArray
};