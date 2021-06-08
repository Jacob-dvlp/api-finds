
exports.up = knex =>
    knex.schema.createTable("users", table => {
            table.increments('id_user').primary(),
            table.string("nome").notNullable(),
            table.string("provinci").notNullable(),
            table.string("municipio").notNullable(),
            table.string("bairro").notNullable(),
            table.string("rua").notNullable(),
            table.string("senha").notNullable(),
            table.string("email").unique().notNullable(),
            table.integer('numero').unique().notNullable(),
        table.text("foto").notNullable(),
        table.timestamp("createdAt").defaultTo(knex.fn.now()),
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    }
    );


exports.down = knex =>
    knex.schema.dropTable("users");
