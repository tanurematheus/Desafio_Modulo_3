import Login from './paginas/Login';
import Home from './paginas/Dindin';
import Cadastro from './paginas/Cadastro/App'

import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, Outlet, Navigate, BrowserRouter } from "react-router-dom";

import { obterItem } from './utils/storage'

function rotasProtegidas({ redirecionarPara }) {
    const autenticado = obterItem('token');

    return autenticado ? <Outlet /> : <Navigate to={redirecionarPara} />
}
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>

        </BrowserRouter>


    </React.StrictMode>,
    document.getElementById('root'));


