function getArray(req) {
    let array = [];
    switch (req.url) {
        case '/usuario':
            array = ['nome', 'email', 'senha'];
            break;
        case '/login':
            array = ['email', 'senha'];
            break;
        default:
            break;
    }
    return array;
}

module.exports = {
    getArray
};