const express = require("express");
const Mongoose = require("mongoose");
const router = express.Router();
const signinRe = require("../middlewares/signinRe");
const Post = require("../models/post.model");

router.get("/allposts", signinRe, function (req, res) {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.post("/createpost", signinRe, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please Add All Required Fields" });
  }

  req.user.password = undefined;

  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      res.status(200).json({ post: result });
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.get("/myposts", signinRe, function (req, res) {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myposts) => {
      res.status(200).json({ myposts });
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

module.exports = router;
