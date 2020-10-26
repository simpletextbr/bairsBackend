exports.up = function(knex) {
    return knex.schema.createTable("instituition", function (colunm) {
        colunm.increments("id").primary();
        colunm.string("campus").notNullable();
        colunm.string("address").notNullable();
        colunm.string("neighborhood").notNullable();
        colunm.string("number").notNullable();
        colunm.string("CEP", 9).notNullable();
        colunm.string("city").notNullable();
        colunm.string("uf", 2).notNullable();
        colunm.integer("rate")
    
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("instituition");
};
