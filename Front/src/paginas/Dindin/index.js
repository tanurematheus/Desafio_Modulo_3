import { useState, React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AdicionarAcao from '../Modal/AdicionarRegistros';
import Perfil from '../Modal/EditarPerfil';
import Filtrar from '../Filtro'
import './index.css';
import usuario from '../../assets/usuario.svg';
import sair from '../../assets/sair.svg';
import filtro from '../../assets/filtro.svg';
import logo from '../../assets/logo.svg';
import { limparTudo } from '../../utils/storage';
import { obterItem } from '../../utils/storage';


function TelaPrincipal() {
    const navigate = useNavigate();
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [abrirFiltro, setAbrirFiltrar] = useState(false);
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [nome, setNome] = useState('');
    const [usuarioToken, setUsuarioToken] = useState('');

    useEffect(() => {
        buscarUsuario();
        handlerSaldo();
    }, []);

    async function buscarUsuario() {
        const token = obterItem('token');
        const response = await api.get('/usuario', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setNome(response.data.nome);
        setUsuarioToken(token);
    }

    function handleSair() {
        limparTudo();
        navigate('/');
    }

    async function handlerSaldo() {
        const token = obterItem('token');
        const response = await api.get('/transacao/extrato', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setEntrada((response.data.entrada / 100).toFixed(2));
        setSaida((response.data.saida / 100).toFixed(2));
        setSaldo(((response.data.entrada - response.data.saida) / 100).toFixed(2));
    }

    function adicionandoRegistros() {
        setAbrirModal(true)
    }
    function fecharModal() {
        setAbrirModal(false)
    }

    function editorPerfil() {
        setAbrirPerfil(true)
    }
    function fecharPerfil() {
        setAbrirPerfil(false)
    }

    function filtrando() {
        setAbrirFiltrar(!abrirFiltro)
    }

    return (
        <div className='background'>
            <div className='cabecalho'>
                <div className='logo'>
                    <img src={logo} />
                    <h1>Dindin</h1>
                </div>
                <div className='usuario'>
                    <button className='btn usuario'
                        onClick={() => editorPerfil()}>
                        <img
                            className='fotoUsuario'
                            src={usuario}
                        />
                        <span>{nome}</span>
                    </button>
                    <button className='btn'>
                        <img src={sair}
                            onClick={() => handleSair()}
                        />
                    </button>
                </div>

                {abrirPerfil && <Perfil
                    fecharPerfil={fecharPerfil}
                    token={usuarioToken}
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
                        {abrirFiltro && <Filtrar token={usuarioToken} />}
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

        </div >
    )
}

export default TelaPrincipal;