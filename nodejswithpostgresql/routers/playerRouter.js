const router = require("express").Router();
// let data = require("../data.js");
const player = require("../data/data-model");
// const dbConfig = require("../data/db-config.js");

//GET ALL
router.get("/", (req, res) => {
  player
    .getAllPlayers()
    .then((players) => {
      res.status(200).json(players);
    })
    .catch((error) =>
      next({
        statusCode: "500",
        error: "Error happened while fetching players",
      })
    );
});

//GET
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  player.getPlayerByid(
    id
      .then((player) => {
        if (player) {
          res.status(200).json(player);
        } else {
          next({
            statusCode: 400,
            error: "Player could not be found",
          });
        }
      })
      .catch((error) => {
        next({
          statusCode: 500,
          error: "Error happened while fetching player",
          errorMessage: error,
        });
      })
  );
});

//POST
router.post("/", (req, res, next) => {
  let new_player = req.body;
  console.log(new_player);
  if (!new_player.name) {
    next({ statusCode: "404", error: "Name cannot be empty" });
  } else {
    player
      .addPlayer(new_player)
      .then((addedPlayer) => {
        res.status(201).json(addedPlayer);
      })
      .catch((error) => {
        next({
          statusCode: "500",
          error: "Errro happned while adding new player",
          errrorMessage: error,
        });
      });
  }
});

//PUT
router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const req_updated_player = req.body;

  if (!req_updated_player.name) {
    next({
      statusCode: "404",
      error: "Name cannot be empty for the player",
    });
  } else {
    player
      .updatePlayer(req_updated_player, id)
      .then((updatedPlayer) => {
        res.status(200).json(updatedPlayer);
      })
      .catch((error) => {
        next({
          statusCode: "404",
          error: "Error happened while updating player",
          errorMessage: error,
        });
      });
  }
});

//DELETE

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  player
    .deletePlayer(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).end();
      }
      s;
    })
    .catch((error) => {
      next({
        statusCode: 500,
        error: "Player could not be deleted",
        errorMessage: error,
      });
    });
});

module.exports = router;
