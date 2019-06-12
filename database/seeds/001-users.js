const bcryptjs = require('bcryptjs');
const seedPass = ['deliciousFruit', 'aKindOfVeggie', 'iceBlast'];


exports.seed = function(knex, Promise) {
    
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Banana', password: `${bcryptjs.hashSync(seedPass[0], 8)}`},
        {username: 'Onion', password: `${bcryptjs.hashSync(seedPass[1], 8)}`},
        {username: 'Mitchum', password: `${bcryptjs.hashSync(seedPass[2], 8)}`}
      ]);
    });
};
