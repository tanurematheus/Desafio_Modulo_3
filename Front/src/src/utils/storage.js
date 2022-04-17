function definirItem(chave, valor) {
    localStorage.setItem(chave, valor);
}

function obterItem(chave) {
    return localStorage.getItem(chave);
}

function removerItem(chave) {
    localStorage.removeItem(chave);
}

function limparTudo() {
    localStorage.clear();
}

module.exports = {
    definirItem,
    obterItem,
    removerItem,
    limparTudo
}
