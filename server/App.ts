import express from "express";
const cors = require("cors");
const postRouter = require("./routers/postRouter");
const app = express();

// Middleware
app.use(cors());

// Routes
app.use("/api/post", postRouter);

module.exports = app;
