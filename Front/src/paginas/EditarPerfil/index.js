import { useState, React } from 'react';
import fechar from '../../assets/fechar.svg';
import './index.css'


function Perfil({ fecharPerfil }) {
    return (
        <>

            <div className='editandoPerfil'>
                <div className='centralizarModal'>
                    <div className='inicioModal'>
                        <h1>Editar Perfil</h1>
                        <img
                            src={fechar}
                            onClick={() => fecharPerfil()}
                        />
                    </div>
                    
                    <div className='formulario'>
                        <form>
                            <label>Nome</label>
                            <input />

                            <label>email</label>
                            <input
                                type="email"
                            />

                            <label>Senha</label>
                            <input type="password" />

                            <label>Confirmação de senha</label>
                            <input type="password" />

                            <button >Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    )

}

export default Perfil;