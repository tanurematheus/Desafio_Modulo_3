import { useState, React } from 'react';
import fechar from '../../../assets/fechar.svg';
import api from '../../../services/api';
import './index.css'


function Perfil({ fecharPerfil, token }) {
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
            const response = await api.put(`/usuario`, {
                nome,
                email,
                senha
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(`Seu usuário foi atualizado com sucesso!`);
            fecharPerfil();
        }
        catch (error) {
            alert(error.response.data.mensagem);
        }
    }
    return (
        <>

            <div className='editandoPerfil'>
                <div className='centralizarPerfil'>
                    <div className='inicioModal'>
                        <h1>Editar Perfil</h1>
                        <img
                            src={fechar}
                            onClick={() => fecharPerfil()}
                        />
                    </div>

                    <div className='formularioAtualizar'>
                        <form onSubmit={handleSubmit}>
                            <label>Nome</label>
                            <input
                                required
                                type="text"
                                value={nome}
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

                            <button type='submit'
                            >Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Perfil;