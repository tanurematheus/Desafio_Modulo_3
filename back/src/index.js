const express = require('express');
const rotas_login = require('./routes/rotas_login');
const rotas_transacao = require('./routes/rotas_transacao');
const rotas_usuario = require('./routes/rotas_usuario');

const app = express();

app.use(express.json());

app.use(rotas_login);
app.use(rotas_usuario);
app.use(rotas_transacao);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});