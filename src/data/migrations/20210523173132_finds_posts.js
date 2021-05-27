
exports.up = knex => knex.schema.createTable("posts", table => {
    table.increments("id_post"),
        table.string("title").notNullable(),
        table.integer("id_key_user").unsigned().notNullable(),
        table.string("image_item").notNullable(),
        table.string("ativo").notNullable(),
        table.foreign("id_key_user").references("id_user").inTable("users"),
        table.timestamp("createdAt").defaultTo(knex.fn.now()),
        table.timestamp("updatedAt").defaultTo(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("posts");
