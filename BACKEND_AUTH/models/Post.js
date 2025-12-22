//models/Post.js


import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);

// const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     images: [{ type: String }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Post", PostSchema);

