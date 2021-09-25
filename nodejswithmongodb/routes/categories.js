const router = require("express").Router();
const { writeFile } = require("fs");
const { builtinModules } = require("module");
const Category = require("../models/Category");

//Create

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update

router.put("/:id", async (req, res) => {
  const willBeUpdatedCategory = await Category.findById(req.params.id);

  console.log(willBeUpdatedCategory);

  if (willBeUpdatedCategory.id === req.params.id) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  } else {
    res.status(401).json("You cannot change another category");
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    var willbeDeletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (willbeDeletedCategory !== null)
      res
        .status(200)
        .json(`Category with id ${req.params.id} deleted successfully`);
    else res.status(401).json(`There is no category with id :${req.params.id}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET

router.get("/:id", async (req, res) => {
  try {
    const foundCategory = await Category.findById(req.params.id);

    if (foundCategory !== null) res.status(200).json(foundCategory);
    else res.status(401).json(foundCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  try {
    let categories;
    categories = await Category.find();

    if (categories.length !== 0) res.status(200).json(categories);
    else res.status(401).json("There is no category");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
