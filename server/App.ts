import express from "express";
require("express-async-errors");
import middleware from "./utils/middleware";
const cors = require("cors");
const postRouter = require("./routers/postRouter");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// Routes
app.use("/api/posts", postRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
