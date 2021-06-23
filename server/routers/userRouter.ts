import express from "express";
import userModel from "../db/models/userModel";
const userRouter = express.Router();
import User from "../db/models/userModel";
import { IUserLogin, IUser } from "../types/types";
import jwt from "jsonwebtoken";

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.body.id);
  if (user) {
    res.json(user);
  }
  res.status(404).json({ error: "User with id doesn't exist on server" });
});

userRouter.get("/", async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post("/register", async (req, res) => {
  const body = req.body;

  const user = new User({ ...body });

  const savedUser = await user.save();
  res.json(savedUser);
});

userRouter.post("/login", async (req, res) => {
  const body: IUserLogin = req.body;

  console.log(body);

  let foundUser;
  if (body.username) {
    console.log("username");
    foundUser = await User.findOne({ username: body.username });
  } else if (body.email) {
    console.log("email");
    foundUser = await User.findOne({ email: body.email });
  }

  const correctPass =
    foundUser === null ? false : body.password === foundUser.password;

  if (!(foundUser && correctPass)) {
    return res.status(401).json({
      error: "Invalid username/email or password",
    });
  }

  const userForToken = {
    username: foundUser.username,
    id: foundUser._id,
  };

  const token = jwt.sign(userForToken, "secret");

  res.status(200).send({ token });
});

module.exports = userRouter;
