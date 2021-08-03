import express, { request } from "express";
const postRouter = express.Router();
import Post from "../db/models/postModel";
import {
  assignPostToUser,
  removePostFromUser,
  userOwnsPost,
} from "../services/userServices";
import {
  tokenBelongsToUser,
  verifyToken,
  getUserIdFromToken,
} from "../utils/tokenUtils";

postRouter.get("/", verifyToken, async (_req, res) => {
  const posts = await Post.find({}).populate("user");
  res.json(posts);
});

postRouter.get("/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user");
  if (post) {
    res.json(post);
  } else {
    res.status(404).end();
  }
});

postRouter.post("/", async (req, res) => {
  const body = req.body;

  const userId: string = getUserIdFromToken(req.token);

  const post = new Post({
    title: body.title,
    content: body.content,
    author: body.author,
    date: new Date().toISOString(),
    upvotes: 0,
    user: userId,
  });

  assignPostToUser(userId, post);

  const savedPost = await post.save();
  res.json(savedPost);
});

postRouter.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  // Check if user owns post
  const ownsPost = await userOwnsPost(id, req.token).then((res) => res);
  if (!ownsPost) {
    res.status(401).json({
      errorMsg: "Posts can only be deleted by the creator of the post",
    });
    return;
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  if (deletedPost) {
    removePostFromUser(getUserIdFromToken(req.token), deletedPost.id);
    res.status(200).json(deletedPost);
  } else {
    res.status(404).json({ errorMsg: "Post is removed from server" });
  }
});

postRouter.put("/:id", verifyToken, async (req, res) => {
  const body = req.body;

  const id = req.params.id;

  // Check if user owns post
  const ownsPost = await userOwnsPost(id, req.token).then((res) => res);
  if (!ownsPost) {
    res.status(401).json({
      errorMsg: "Posts can only be edited by the creator of the post",
    });
    return;
  }

  const post = {
    title: body.title,
    content: body.content,
    date: new Date().toISOString(),
  };

  const updatedPost = await Post.findByIdAndUpdate(id, post, {
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
  ).populate("user");

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
  ).populate("user");

  if (updatedPost) {
    res.json(updatedPost);
  } else {
    res.status(404).json({ errorMsg: "Post is removed from server" });
  }
});

module.exports = postRouter;
