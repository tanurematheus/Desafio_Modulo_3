function definirItem(chave, valor){
    localStorage.definirItem(chave, valor);
}

function obterItem(chave){
    return localStorage.obterItem(chave)
}

function removerItem(chave){
    localStorage.removeItem(chave)
}
function limparTudo(){
    localStorage.limparTudo();
}

