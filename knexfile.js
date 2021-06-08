module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'procurados&achados',
      user:'postgres',
      password:'123'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./src/data/migrations"
    },
    seeds: {
      directory: "./src/data/seeds"

    }
  },
  useNullAsDefault: false,

};
