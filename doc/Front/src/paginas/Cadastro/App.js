import { useState, React } from 'react';
import './App.css';
import logo from '../../assets/logo.svg'





function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [error, setError] = useState('')

  function submeterFormulario(evento){
    evento.preventDefault();

    setError('');

    if (!nome) {
      return;
    }

    if (!email) {
      return;
    }

    if (!senha) {
      return;
    }
  }

  return (
    <div className="telaInicial">
      <div className='logotipo'>
      <img src={logo}/>
      <h2>Dindin</h2>

      </div>
      
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

          <button type="submit">
            Cadastrar
          </button>
          <a href=''>Já tem cadastro? Clique aqui!</a>

        </form>
      </div>
    </div>
  );
}

export default App;
