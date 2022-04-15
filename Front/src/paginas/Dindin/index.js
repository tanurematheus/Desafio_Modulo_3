import { useState, React } from 'react';
import AdicionarAcao from '../Modal/AdicionarRegistros';
import Perfil from '../Modal/EditarPerfil';
import Filtrar from '../Filtro'
import './index.css';
import usuario from '../../assets/usuario.svg';
import sair from '../../assets/sair.svg';
import filtro from '../../assets/filtro.svg';
import logo from '../../assets/logo.svg'


function TelaPrincipal(){

    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [abrirFiltro, setAbrirFiltrar] = useState(false)
    
    const entrada = "1000,00";
    const saida = "500,00";
    const saldo = "500,00";

    function adicionandoRegistros(){
        setAbrirModal(true)
    }
    function fecharModal(){
        setAbrirModal(false)
    }

    function editorPerfil(){
        setAbrirPerfil(true)
    }
    function fecharPerfil(){
        setAbrirPerfil(false)
    }

    function filtrando(){
        setAbrirFiltrar(!abrirFiltro)
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
                    onClick={() => editorPerfil()}
                    />
                    <span>Nome</span>
                    <img src={sair}/>
                </div>

                {abrirPerfil && <Perfil
                    fecharPerfil={fecharPerfil}

                />}

            </div>

            <div className='parteBranca'>
                <button className='filtrar' onClick={() => filtrando()}>
                    <img 
                        src={filtro}
                        />
                    <span>Filtrar</span>
                </button>
                <div className='conteudo'>

                <div>


                {abrirFiltro && <Filtrar/>}

                    <div className='extrato'>
                        <span>Data</span>
                        <span>Dia da semana</span>
                        <span>Descrição</span>
                        <span>Categoria</span>
                        <span>Valor</span>
                    </div>
                </div>
                <div className='dados'>
                    <div className='grupoResumo'>
                        <div className='resumo'>
                            <h2>Resumo</h2>
                            <div className='movimentacao'>
                                <p>Entradas <span className='movimentacaoEntrada'>R$ {entrada}</span></p>
                                    <p>Saídas <span className='movimentacaoSaida'>R$ {saida}</span></p>
                            </div>
                            <div className='borda'></div>
                            <p className='saldo'>Saldo <span>R$ {saldo}</span></p>
                        </div>
                        <button
                            onClick={() => adicionandoRegistros()}
                        >
                            Adicionar Registro
                        </button>
                    </div>
                        {abrirModal && <AdicionarAcao
                            fecharModal={fecharModal}
                            
                        />}
                </div>
                </div>
            </div>

         </div>
    )
}

export default TelaPrincipal;