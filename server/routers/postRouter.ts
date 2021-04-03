import express from "express";
const postRouter = express.Router();

postRouter.get("/", (_req, res) => {
  res.send("posts");
});

module.exports = postRouter;
