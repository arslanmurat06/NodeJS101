exports.seed = function (knex) {
  // Deletes ALL existing entries
  // return knex('players').del()
  //   .then(function () {
  //     // Inserts seed entries
  return knex("players").insert([
    { id: 1, name: "Hami Mandirali", team_id: 1 },
    { id: 2, name: "Alex De Souza", team_id: 2 },
    { id: 3, name: "Querasma", team_id: 3 },
  ]);
  // });
};
