const router = require("express").Router();
const Post = require("../models/Post");

//CREATE

router.post("/", async (req, res) => {
  console.log(req);
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
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    try {
      await post.delete();
      res.status(200).json("Post has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET

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

//GET ALL

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;

    if (username) posts = await Post.find({ username: username });
    else if (catName)
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    else posts = await Post.find();

    console.log(posts);

    if (posts.length === 0) res.status(404).json("Could not be found any post");
    else res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
