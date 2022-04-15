import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api'


function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [error, setError] = useState('')

  async function submeterFormulario(evento){
    evento.preventDefault();

   try{
     if (!nome || !email || !senha || !confirmarSenha) {
       
       return;
     }

     if (senha != confirmarSenha){
       return;
     }
    const resposta = await api.post('usuario', {
      nome, email, senha, confirmarSenha
    });

    console.log(resposta);

   }catch(error){
    console.log(error)
   }
  }

  return (
    <div className="telaInicial">
      <div className='logotipo'>
      <img src={logo}/>
      <h2>Dindin</h2>

      </div>
       <div className='centralizar'>
        <div className="cadastro">
          <h1>Cadastre-se</h1>
          <form onSubmit={submeterFormulario}>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <label>Confirmação de senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <button
              type="submit"
              onClick={(e) => submeterFormulario(e)}
            >
              Cadastrar
            </button>
            <Link to='/'>Já tem cadastro? Clique aqui!</Link>

          </form>

        </div>
       </div>
    </div>
  );
}

export default App;
