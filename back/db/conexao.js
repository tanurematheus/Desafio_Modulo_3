const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'safira01',
    host: 'localhost',
    port: 5432,
    database: 'dindin'
});

const query = (text, params) => {
    return pool.query(text, params);
}

module.exports = {
    query
}
