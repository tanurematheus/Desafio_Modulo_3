import { useState, React } from 'react';
import './index.css';

function Login(){
    return(
        <div className='paginaIncial'>
            <div className='boxTexto'>
                <h1>Controle suas finanças, sem planilha chata.</h1>
                <h2>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h2>
                <button>Cadastre-se</button>
            </div>
            <div className='boxLogin'>
                <h2>Login</h2>
                <form>
                    <label></label>
                </form>
            </div>
        </div>
    );
}

export default Login;