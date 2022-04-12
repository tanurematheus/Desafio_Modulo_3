import axios from 'axios';

export default axios.create({
    baseURL: 'https://desafio-backend-03-dindin.herokuapp.com/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});