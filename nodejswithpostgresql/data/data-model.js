const db = require("./db-config");

module.exports = {
  getAllPlayers,
  getPlayerByid,
  addPlayer,
  updatePlayer,
  deletePlayer,
};

function getAllPlayers() {
  return db("players");
}

function getPlayerByid(id) {
  return db("players").where({ id }).first();
}

function addPlayer(newPlayer) {
  return db("players")
    .insert(newPlayer, "id")
    .then(([id]) => {
      return db("players").where({ id }).first();
    });
}

function updatePlayer(updatedPlayer, id) {
  return db("players")
    .update(updatedPlayer)
    .where({ id })
    .then((updated) => {
      if (updated === 1) {
        return db("players").where({ id }).first();
      }
    });
}

function deletePlayer(id) {
  return db("players").del().where({ id });
}
