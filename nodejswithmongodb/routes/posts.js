const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//CREATE

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only update your own posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only delete your own posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET POST

router.get("/:id", async (req, res) => {
  try {
    var post = await Post.findById(req.params.id);
    if (post !== null) res.status(200).json(post);
    else
      res.status(404).json(`Post could not be found with id:${req.params.id}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
