var knex = require('../knex.js');

// function Admins() {
//   return knex('admins');
// }

// *** queries *** //

// function findOne(filter){
//   return Admins().where(filter).first().then((row) => row);
// }

module.exports = knex('admin');