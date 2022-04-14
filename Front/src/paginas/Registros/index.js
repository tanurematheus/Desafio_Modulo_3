import { useState, React } from 'react';
import fechar from '../../assets/fechar.svg';
import './index.css'


function Modal({ fecharModal }) {
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
                        <button className='modalEntradas'>Entrada</button>
                        <button className='modalSaidas'>Saída</button>
                    </div>
                    <div className='formulario'>
                        <form>
                            <label>Valor</label>
                            <input />

                            <label>Categoria</label>
                            <select name="select">
                                <option value="selecione"></option>
                                <option value="alimentacao">Alimentação</option>
                                <option value="assinaturasEServicos">Assinaturas e Serviços</option>
                                <option value="casa">Casa</option>
                                <option value="compras">Compras</option>
                                <option value="cuidadosPessoais">Casa</option>
                                <option value="educacao">Educação</option>
                            </select>

                            <label>Data</label>
                            <input
                                type="date"
                            />

                            <label>Descrição</label>
                            <input type="text" />

                            <button>Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Modal;