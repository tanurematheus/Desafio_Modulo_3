import { useState, React } from 'react';

import './index.css';
import Cadastro from '../Cadastro'
import Login from '../Login';


function Principal() {

    const caminhoAtual = window.location.pathname;
    return (
        <div className='rotas'>
            {caminhoAtual === '/Cadastro' && <Cadastro />}
            {caminhoAtual === '/Login' && <Login />}
        </div>
    )
}

