//arquivo que configura o knex

//aqui eu digo para o knex usar SQlite

//informo aonde ficam os arquivos

require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/database.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
};
