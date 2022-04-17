import { useState, React } from 'react';
import mais from '../../assets/mais.svg';
import fecharFiltro from '../../assets/fecharFiltro.svg'
import './index.css'
import api from '../../services/api';
import { useEffect } from 'react';


function Filtrar({ token }) {
    const [filtroAtivo, setFiltroAtivo] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        buscarCategorias();
    }, []);

    async function buscarCategorias() {
        const response = await api.get('/categoria', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCategorias(response.data);
    }

    function toggleFiltro(filtro) {
        if (filtroAtivo.includes(filtro)) {
            setFiltroAtivo([...filtroAtivo.filter(item => item !== filtro)])
        } else {
            setFiltroAtivo([...filtroAtivo, filtro])
        }
    }

    return (
        <div className='corpo'>
            <div className='centralizarCatgorias'>
                <h2>Categoria</h2>
                <div className='categorias'>
                    {
                        categorias.map(categoria => (
                            <div key={categoria.id} className={filtroAtivo.includes(categoria.descricao) ? 'filtroSelecionado' : ''}>
                                <button onClick={() => toggleFiltro(categoria.descricao)}>
                                    {categoria.descricao}
                                    <img src={filtroAtivo.includes(categoria.descricao) ? fecharFiltro : mais} />
                                </button>
                            </div>
                        ))
                    }
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