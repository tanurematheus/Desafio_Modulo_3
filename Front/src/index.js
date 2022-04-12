import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cadastro from './paginas/Cadastro/App'
import Login from './paginas/Login';
import Home from './paginas/Dindin'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
            </Routes>
            
        </BrowserRouter>


    </React.StrictMode>,
    document.getElementById('root'));


