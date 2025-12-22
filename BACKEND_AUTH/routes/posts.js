// routes/posts.js

import express from "express";
import Post from "../models/Post.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// CREATE POST
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content, images } = req.body;

    const post = await Post.create({
      userId: req.user.id,
      title,
      content,
      images
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("userId", "email")
    .sort({ createdAt: -1 });

  res.json(posts);
});

export default router;


// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");
// const auth = require("../middleware/auth");

// // CREATE POST
// router.post("/", auth, async (req, res) => {
//   try {
//     const { title, content, images } = req.body;

//     const post = await Post.create({
//       userId: req.user.id,
//       title,
//       content,
//       images
//     });

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET ALL POSTS
// router.get("/", async (req, res) => {
//   const posts = await Post.find()
//     .populate("userId", "email")
//     .sort({ createdAt: -1 });

//   res.json(posts);
// });

// module.exports = router;
