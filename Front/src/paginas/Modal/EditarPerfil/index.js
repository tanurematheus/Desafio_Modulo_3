import { useState, React } from 'react';
import fechar from '../../../assets/fechar.svg';
import api from '../../../services/api';
import './index.css'
import {obterItem} from '../../../utils/storage'
import { rotasProtegidas} from '../../../index'


function Perfil({ fecharPerfil }) {
    const [atualizar, setAtualizar] = useState(null);
    const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmacaoSenha: '' });
    const [atual, setAtual] = useState(null);

    async function atualizandoPerfil(e) {
        e.preventDefault();

        try{
            if (!form.nome || form.email || !form.senha || !form.confirmacaoSenha) {
                return;
            }

            if (form.senha != form.confirmacaoSenha) {
                return;
            }
            const usuarioId = obterItem('usuarioId')
            const token = obterItem('token');
            const resposta = await api.put(`/usuario/${usuarioId}`, 
            {
                ...form
            },
            {
                headers:{
                    rotasProtegidas: `Bearer ${token}`
                }
            }
            )
        } catch (error) {

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
                        <form onSubmit={atualizandoPerfil}>
                            <label>Nome</label>
                            <input />

                            <label>E-mail</label>
                            <input
                                type="email"
                            />

                            <label>Senha</label>
                            <input type="password" />

                            <label>Confirmação de senha</label>
                            <input type="password" />

                            <button type='submit'
                                onClick={() => setAtualizar()}
                            >Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Perfil;