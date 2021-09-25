exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("teams")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("teams").insert([
        { id: 1, name: "TrabzonSpor" },
        { id: 2, name: "Fenerbahce" },
        { id: 3, name: "Besiktas" },
      ]);
    });
};
