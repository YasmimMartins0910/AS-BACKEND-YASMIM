//aquivo que cria a conexão com o banco

//também exporta a conexão do knex

//para quando eu precisar consultar ou inserir algo no banco,

//eu import essa conexão nos services

const knex = require('knex');
const config = require('../../knexfile');

const connection = knex(config.development);

module.exports = connection;
