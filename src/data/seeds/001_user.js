
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          nome: 'Jacob',
          provinci: "Luanda",
          municipio: "Viana",
          bairro: "Kapalanga",
          rua: "Agostinho Neto",
          numero: "123456789",
          foto: "Jacob.png",
        },

      ]);
    });
};
