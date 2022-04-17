import { useState, React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api'


function App() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('Senhas não conferem');
      return;
    }
    try {
      const response = await api.post('/usuario', {
        nome,
        email,
        senha
      });

      alert(`Seu usuário foi criado com sucesso!`);
      navigate('/');
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  return (
    <div className="telaInicial">
      <div className='logotipo'>
        <img src={logo} />
        <h2>Dindin</h2>

      </div>
      <div className='centralizar'>
        <div className="cadastro">
          <h1>Cadastre-se</h1>
          <form onSubmit={handleSubmit}>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              required
              onChange={(e) => setNome(e.target.value)}
            />

            <label>E-mail</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha</label>
            <input
              type="password"
              value={senha}
              required
              onChange={(e) => setSenha(e.target.value)}
            />

            <label>Confirmação de senha</label>
            <input
              type="password"
              value={confirmarSenha}
              required
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <button
              type="submit"
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
