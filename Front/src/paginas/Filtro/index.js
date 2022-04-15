import { useState, React } from 'react';
import mais from '../../assets/mais.svg';
import fecharFiltro from '../../assets/fecharFiltro.svg'
import './index.css'


function Filtrar() {
    const [filtroAtivo, setFiltroAtivo] = useState([]);
    const arrayBotoes = [
        "Contas",
        "Depósito",
        "Lazer",
        "Mercado",
        "TED",
        "Compras",
        "Farmácia",
        "Pix",
    ]

    function toggleFiltro(filtro){
        if (filtroAtivo.includes(filtro)) {
            setFiltroAtivo([...filtroAtivo.filter(item => item !== filtro)])
        } else{
            setFiltroAtivo([...filtroAtivo, filtro])
        }
    }

    return (
        <div className='corpo'>
            <div className='centralizarCatgorias'>
                <h2>Categoria</h2>
                <div className='categorias'>
                    {arrayBotoes.map(botao => {
                        return <button className={filtroAtivo.includes(botao) ? 'filtroSelecionado' : ''} onClick={() => toggleFiltro(botao)} key={botao}>{botao}<img src={filtroAtivo.includes(botao) ? fecharFiltro : mais}/></button>
                    })}
                </div>
                <div className='limparAplicar'>
                    <button className='limpar' onClick={() => setFiltroAtivo([])}>Limpar Filtros</button>
                    <button className='aplicar'>Aplicar Filtros</button>

                </div>
            </div>
        </div>
    )
}

export default Filtrar;