const Knex = require('knex');
const Configuration = require('./../../knexfile');
const kenx = Knex(Configuration.development);

module.exports = kenx;
