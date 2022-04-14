import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cadastro from './paginas/Cadastro/App'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from './paginas/Login';
import Home from './paginas/Dindin';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
            </Routes>
            
        </BrowserRouter>


    </React.StrictMode>,
    document.getElementById('root'));


