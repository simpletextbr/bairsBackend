
exports.up = function(knex) {
    return knex.schema.createTable("category", function (colunm) { 
        colunm.increments("id").primary();
        colunm.string("name").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("category");
};
