//One to many relationship

exports.up = function (knex) {
  return knex.schema
    .createTable("teams", (table) => {
      table.increments();
      table.string("name").notNullable();
    })
    .createTable("players", (table) => {
      table.increments();
      table.string("name").notNullable();
      table
        .integer("team_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("teams");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("teams").dropTableIfExists("players");
};
