
exports.up = function(knex) {
    return knex.schema.createTable("classroom", function (colunm) { 
        colunm.increments("id").primary();
        colunm.string("name").notNullable();
        colunm.string("period").notNullable();
        colunm.string("study_shift").notNullable();


        colunm.integer("instituition_id").notNullable();
        colunm.foreign("instituition_id").references("id").inTable("instituition");

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("classroom");
};
