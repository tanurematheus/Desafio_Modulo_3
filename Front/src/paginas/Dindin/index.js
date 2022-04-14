import { useState, React } from 'react';
import Modal from '../Registros'
import Perfil from '../EditarPerfil'
import './index.css';
import usuario from '../../assets/usuario.svg';
import sair from '../../assets/sair.svg';
import filtro from '../../assets/filtro.svg';
import logo from '../../assets/logo.svg'


function TelaPrincipal(){

    const [abrirModal, setAbrirModal] = useState(false);
    
    const entrada = 1000;
    const saida = 500;
    const saldo = 500;

    function adicionandoRegistros(){
        setAbrirModal(true)
        console.log("função")
    }
    function fecharModal(){
        setAbrirModal(false)
    }

    return(
         <div className='background'>
            <div className='cabecalho'>
                <div className='logo'>
                    <img src={logo} />
                    <h1>Dindin</h1>
                </div>
                <div className='usuario'>
                    <img 
                    className='fotoUsuario' 
                    src={usuario}
                    onClick={() => adicionandoRegistros()}
                    />
                    {abrirModal && <Perfil
                        fecharModal={fecharModal}

                    />}
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
                            <p>Entradas <span>{entrada}</span></p>
                            <p>Saídas <span>{saida}</span></p>
                            <p>Saldo <span>{saldo}</span></p>
                        </div>
                        <button
                            onClick={() => adicionandoRegistros()}
                        >
                            Adicionar Registro
                        </button>
                    </div>
                        {abrirModal && <Modal
                            fecharModal={fecharModal}
                            
                        />}
                </div>
            </div>
         </div>
    )
}

export default TelaPrincipal;