import express from "express";
import userModel from "../db/models/userModel";
const userRouter = express.Router();
import User from "../db/models/userModel";
import { IUserLogin, IUser, IUserPass } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  const body: IUserPass = req.body;

  // Check if email already exists
  // Check that email is valid

  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = new User({
    email: body.email,
    name: body.name,
    passwordHash,
  });

  const savedUser: any = await user.save();

  const userForToken = {
    email: savedUser.email,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, "secret");

  res.status(200).send({ token, name: savedUser.name });
});

userRouter.post("/login", async (req, res) => {
  const body: IUserLogin = req.body;

  const foundUser: any = await User.findOne({ email: body.email });
  console.log("Found user", foundUser);

  const typedPass: string = foundUser.password;

  const correctPass =
    foundUser === null
      ? false
      : await bcrypt.compare(body.password, foundUser.passwordHash);

  if (!(foundUser && correctPass)) {
    return res.status(401).json({
      error: "Invalid email and/or password",
    });
  }

  const userForToken = {
    email: foundUser.email,
    id: foundUser._id,
  };

  const token = jwt.sign(userForToken, "secret");

  res.status(200).send({ token, name: foundUser.name });
});

userRouter.delete("/", async (_req, res) => {
  await User.deleteMany({});
  res.json();
});

module.exports = userRouter;
