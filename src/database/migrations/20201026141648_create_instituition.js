exports.up = function(knex) {
    return knex.schema.createTable("instituition", function (colunm) {
        colunm.increments("id").primary();
        colunm.string("name").notNullable();
        colunm.string("phone").notNullable();
        colunm.string("mail").notNullable();
        colunm.string("campus").notNullable();
        colunm.string("address").notNullable();
        colunm.string("neighborhood").notNullable();
        colunm.string("number").notNullable();
        colunm.string("CEP").notNullable();
        colunm.string("city").notNullable();
        colunm.string("uf", 2).notNullable();
        colunm.string('password').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("instituition");
};
