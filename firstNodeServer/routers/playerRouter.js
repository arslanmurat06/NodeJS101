const router = require("express").Router();
let data = require("../data.js");

//GET ALL
router.get("/", (req, res) => {
  res.status(200).json(data);
});

//GET
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const player = data.find((player) => player.id === parseInt(id));

  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).send(`The player  with id ${id} could not be found`);
  }
});

//POST
let next_id = 3;
router.post("/", (req, res) => {
  let new_player = req.body;
  new_player.id = next_id;
  next_id++;
  data.push(new_player);

  res.status(201).json(new_player);
});

//PUT
router.put("/", (req, res) => {
  const req_updated_player = req.body;
  var found_index = data.findIndex((p) => p.id === req_updated_player.id);
  console.log(found_index);
  if (found_index !== -1) {
    data[found_index] = req_updated_player;
    res.status(203).json(data);
  } else {
    res.status(404).json({ error: "Player could not be found" });
  }
});

//DELETE

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  var found_player = data.find((p) => p.id === Number(id));
  if (found_player) {
    data = data.filter((p) => p.id !== Number(id));
    res.status(202).send();
  } else {
    res.status(404).json({ error: "Player could not be found" });
  }
});

module.exports = router;
