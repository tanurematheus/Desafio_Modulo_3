import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' }
});