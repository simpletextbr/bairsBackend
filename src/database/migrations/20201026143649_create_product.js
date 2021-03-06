exports.up = function(knex) {
    return knex.schema.createTable("product", function (colunm) { 
        colunm.increments("id").primary();
        colunm.string("title").notNullable();
        colunm.string("type").notNullable();
        colunm.text("description").notNullable();
        colunm.decimal("price").notNullable();
        colunm.integer("rate");

        colunm.integer("user_id").notNullable();
        colunm.foreign("user_id").references("id").inTable("user");

        colunm.integer("category_id").notNullable();
        colunm.foreign("category_id").references("id").inTable("category");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("product");
};
