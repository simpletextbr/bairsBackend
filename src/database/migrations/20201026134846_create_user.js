exports.up = function(knex) {
    return knex.schema.createTable("user", function (colunm) {
        colunm.increments("id").primary();
        colunm.string("full_name").notNullable();
        colunm.string("username").notNullable();
        colunm.date("birth").notNullable();
        colunm.string("phone", 11).notNullable();
        colunm.string("mail").notNullable();
        colunm.string("password").notNullable();
        colunm.string("situation").notNullable();
        colunm.string("genre").notNullable();
        colunm.string("period").notNullable();
        colunm.string("study_shift").notNullable();
        colunm.integer("rate")
        colunm.string("registration_path")
        colunm.string("profile_path");

        
        colunm.integer("instituition_id").notNullable();
        colunm.foreign("instituition_id").references("id").inTable("instituition");

        colunm.integer("classroom_id").notNullable();
        colunm.foreign("classroom_id").references("id").inTable("classroom");

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
