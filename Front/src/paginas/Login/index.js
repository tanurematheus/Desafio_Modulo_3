import { useState, React } from 'react';
import logo from '../../assets/logo.svg'
import './index.css';


function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    return(
        <div className='paginaIncial'>
            <img src={logo} />
            <div className='boxTexto'>
                <h1>Controle suas finanças, sem planilha chata.</h1>
                <h2>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h2>
                <button>Cadastre-se</button>
            </div>
            <div className='boxLogin'>
                <h2>Login</h2>
                <form>
                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;