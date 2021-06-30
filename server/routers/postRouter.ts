import express, { request } from "express";
const postRouter = express.Router();
import Post from "../db/models/postModel";
import { IPost } from "../types/types";
import { tokenBelongsToUser, verifyToken } from "../utils/tokenUtils";

postRouter.get("/", verifyToken, async (_req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

postRouter.get("/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).end();
  }
});

postRouter.post("/", verifyToken, async (req, res) => {
  const body = req.body;

  const post = new Post({
    title: body.title,
    content: body.content,
    author: body.author,
    date: new Date().toISOString(),
    upvotes: 0,
  });

  const savedPost = await post.save();
  res.json(savedPost);
});

postRouter.delete("/:id", verifyToken, async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  if (deletedPost) {
    res.status(200).json(deletedPost);
  } else {
    res.status(404).json({ errorMsg: "Post is removed from server" });
  }
});

postRouter.put("/:id", verifyToken, async (req, res) => {
  const body = req.body;

  const post = {
    title: body.title,
    content: body.content,
    date: new Date().toISOString(),
  };

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  });

  console.log(updatedPost);

  if (updatedPost) {
    res.json(updatedPost);
  } else {
    res.status(404).json({ errorMsg: "Post is removed from server" });
  }
});

postRouter.put("/upvote/:id", verifyToken, async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { upvotes: 1 } },
    {
      new: true,
    }
  );

  if (updatedPost) {
    res.json(updatedPost);
  } else {
    res.status(404).json({ errorMsg: "Post is removed from server" });
  }
});

postRouter.put("/downvote/:id", verifyToken, async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { upvotes: -1 } },
    {
      new: true,
    }
  );

  if (updatedPost) {
    res.json(updatedPost);
  } else {
    res.status(404).json({ errorMsg: "Post is removed from server" });
  }
});

module.exports = postRouter;
