exports.up = function (knex) {
  return knex.schema.createTable('palpites', function (table) {
    table.increments('id').primary();

    table
      .integer('usuario_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');

    table.string('jogo').notNullable();
    table.integer('gols_a').notNullable();
    table.integer('gols_b').notNullable();
    table.string('data_jogo').notNullable();

    table.string('dolar_no_dia');
    table.string('dia_de_feriado');

    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('palpites');
};
