
exports.up = function(knex) {
    return knex.schema.createTable("images", function (colunm) { 
        colunm.increments("id").primary();
        colunm.string("path").notNullable();

        colunm.integer("product_id").notNullable();
        colunm.foreign("product_id").references("id").inTable("product");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("images");
};
