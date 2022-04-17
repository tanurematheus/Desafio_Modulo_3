import { useState, React } from 'react';
import fechar from '../../../assets/fechar.svg';
import api from '../../../services/api'
import './index.css'


function AdicionarAcao({ fecharModal }) {
    const [usuarios, setUsuarios] = useState([]);
    const [botaoAtivo, setBotaoAtivo] = useState('saida');
    const [form, setForm] = useState({ valor: '', categoria_id: '', data: '', descricao: '' })

    async function listarEntradas() {
        try {
            const resposta = await api.get('/usuario');

            setUsuarios(resposta.data);
        } catch (error) {
            console.log(error)
        }
    }
    async function adicionar(e) {
        e.preventDefault();
        console.log(form)
        // try{
        //     if(!form.valor || !form.categoria_id || !form.data || !form.descricao) {
        //         return;
        //     }
        //     const resposta = await api.post('/transacao', {
        //         ...form
        //     });

        //    setUsuarios([...usuarios, resposta.data])
        //    console.log(resposta)

        // }catch (error) {
        //     console.log(error)
        // }
    }

    function mudarAtivo(botao) {
        setBotaoAtivo(botao)
    }
    function EntradaAtiva() {
        return (
            <>
                <button className='modalEntradas entradaAtiva' onClick={() => mudarAtivo('entrada') && adicionar()}>Entrada</button>
                <button className='modalSaidas' onClick={() => mudarAtivo('saida')}>Saída</button>
            </>
        )
    }

    function SaidaAtiva() {
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
                    <div className='formulario'>
                        <form onSubmit={adicionar}>
                    <div className='botaoModal'>
                        {botaoAtivo === 'entrada' ? <EntradaAtiva /> : <SaidaAtiva />}
                    </div>
                            <label>Valor</label>
                            <input
                                type="text"
                                value={form.valor}
                                onChange={(e) => setForm({ ...form, valor: e.target.value })} />

                            <label>Categoria</label>
                            <select name="select" type="text" value={form.categoria_id} onChange={(e) => setForm({ ...form, categoria_id: e.target.value })} >
                                <option value="selecione"></option>
                                <option value={1}>Alimentação</option>
                                <option value={2}>Assinaturas e Serviços</option>
                                <option value={3}>Casa</option>
                                <option value={4}>Mercado</option>
                                <option value={5}>Cuidados Pessoais</option>
                                <option value={6}>Educação</option>
                                <option value={7}>Família</option>
                                <option value={8}>Lazer</option>
                                <option value={9}>Pets</option>
                                <option value={10}>Presentes</option>
                                <option value={11}>Roupas</option>
                                <option value={12}>Saúde</option>
                                <option value={13}>Transporte</option>
                                <option value={14}>Salário</option>
                                <option value={15}>Vendas</option>
                                <option value={16}>Outas Receitas</option>
                                <option value={17}>Outras Despesas</option>
                            </select>

                            <label>Data</label>
                            <input
                                type="text"
                                value={form.data}
                                onChange={(e) => setForm({ ...form, data: e.target.value })}
                            />

                            <label>Descrição</label>
                            <input type="text" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />

                            <button onClick={(e) => adicionar(e)}>Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default AdicionarAcao;