import { useState, React } from 'react';
import './index.css';
import usuario from '../../assets/usuario.svg';
import sair from '../../assets/sair.svg';
import filtro from '../../assets/filtro.svg';
import logo from '../../assets/logo.svg'


function telaPrincipal(){
    return(
         <div className='background'>
            <div className='cabecalho'>
                <div className='logo'>
                    <img src={logo} />
                    <h1>Dindin</h1>
                </div>
                <div className='usuario'>
                    <img className='fotoUsuario' src={usuario}/>
                    <span>Nome</span>
                    <img src={sair}/>
                </div>

            </div>

            <div className='parteBranca'>
                <button className='filtrar'>
                    <img src={filtro}/>
                    <span>Filtro</span>
                </button>
                <div className='dados'>
                    <div className='extrato'>

                    </div>
                    <div className='grupoResumo'>
                        <div className='resumo'>
                            <h2>Resumo</h2>
                            <p>Entradas</p>
                            <p>Saídas</p>
                            <p>Saldo</p>
                        </div>
                        <button>Adicionar Registro</button>
                    </div>
                </div>
            </div>
         </div>
    )
}

export default telaPrincipal;