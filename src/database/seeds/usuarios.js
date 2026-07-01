//aqui no seeds eu crio meus dois usuários de teste

//limpo os palpites e usuários antigos

//a senha é criptografada com bcrypt pra ficar mais seguro

const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('palpites').del();
  await knex('usuarios').del();

  const senhaCriptografada = await bcrypt.hash('123456', 10);

  await knex('usuarios').insert([
    {
      nome: 'Yasmim',
      email: 'yasmim@email.com',
      senha: senhaCriptografada,
    },
    {
      nome: 'Felipe',
      email: 'felipe@email.com',
      senha: senhaCriptografada,
    },
  ]);
};
