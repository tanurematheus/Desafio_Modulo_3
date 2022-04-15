import { useState, React } from 'react';
import fechar from '../../../assets/fechar.svg';
import api from '../../../services/api'
import './index.css'


function AdicionarAcao({ fecharModal }) {
    const [usuarios, setUsuarios] = useState([]);
    const [botaoAtivo, setBotaoAtivo] = useState('saida');
    const [form, setForm] = useState({valor:'', categoria:'', data:'', descricao:''})

    async function listarEntradas(){
        try {
            const resposta = await api.get('/usuario');

            setUsuarios(resposta.data);
        }catch(error){
            console.log(error)
        }
    }
    async function adicionar(e) {
        e.preventDefault();

        try{
            if(!form.valor || !form.categoria || !form.data || !form.descricao) {
                return;
            }
            const resposta = await api.post('/usuario', {
                ...form
            });
           setUsuarios([...usuarios, resposta.data])

        }catch (error) {
            console.log(error)
        }
    }

    function mudarAtivo(botao){
        setBotaoAtivo(botao)
    }
    function EntradaAtiva(){
        return(
            <>
            <button className='modalEntradas entradaAtiva' onClick={() => mudarAtivo('entrada') && adicionar()}>Entrada</button>
            <button className='modalSaidas' onClick={() => mudarAtivo('saida')}>Saída</button>
            </>
        )
    }

    function SaidaAtiva(){
        return (
            <>
                <button className='modalEntradas' onClick={() => mudarAtivo('entrada')}>Entrada</button>
                <button className='modalSaidas saidaAtiva' onClick={() => mudarAtivo('saida') && adicionar()}>Saída</button>
            </>
        )
    }
    return (
        <>

            <div className='adicionarRegistro'>
                <div className='centralizarModal'>
                    <div className='inicioModal'>
                        <h1>Adicionar Registro</h1>

                        <img
                            src={fechar}
                            onClick={() => fecharModal()}
                        />

                    </div>
                    <div className='botaoModal'>
                        {botaoAtivo === 'entrada' ? <EntradaAtiva/> : <SaidaAtiva/>}
                    </div>
                    <div className='formulario'>
                        <form onSubmit={adicionar}>
                            <label>Valor</label>
                            <input
                            value={form.valor} />

                            <label>Categoria</label>
                            <select name="select" value={form.categoria}>
                                <option value="selecione"></option>
                                <option value="alimentacao">Alimentação</option>
                                <option value="assinaturasEServicos">Assinaturas e Serviços</option>
                                <option value="casa">Casa</option>
                                <option value="compras">Compras</option>
                                <option value="cuidadosPessoais">Casa</option>
                                <option value="educacao">Educação</option>
                            </select>

                            <label>Data</label>
                            <input value={form.data}/>

                            <label>Descrição</label>
                            <input type="text" value={form.descricao}/>

                            <button type='submit'>Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default AdicionarAcao;