import { useState, React } from 'react';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import './index.css';
import api from '../../services/api';



function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function entrar(e){
        e.preventDefault();

        try {
            if (!email || !senha) {
                return;
            }

            const resposta = await api.post('/login', {
                email, senha
            });
            console.log(resposta)

        navigate('/dindin')
        }catch (error){
            console.log(error.message)
            console.log(error.response.data.message)
        }
    }


    return(
        <div className='paginaInicial'>
            <div className='cabecalho'>
                <img src={logo} />
                <h1>Dindin</h1>
            </div>
            <div className='centralizar'>
                <div className='boxTexto'>
                    <h1>Controle suas <span>finanças</span>, sem planilha chata.</h1>
                    <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                    <button onClick={() => navigate("/cadastro")}>
                        Cadastre-se
                    </button>
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
        </div>
    );
}

export default Login;