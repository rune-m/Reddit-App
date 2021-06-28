import express from "express";
import userModel from "../db/models/userModel";
const userRouter = express.Router();
import User from "../db/models/userModel";
import { IUserLogin, IUser, IUserPass } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createAccessToken, verifyToken } from "../utils/tokenUtils";

userRouter.get("/:id", verifyToken, async (req, res) => {
  const user = await User.findById(req.body.id);
  if (user) {
    res.json(user);
  }
  res.status(404).json({ error: "User with id doesn't exist on server" });
});

userRouter.get("/", verifyToken, async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post("/register", async (req, res) => {
  const body: IUserPass = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    res.status(401).json({ errorMsg: "Email is already registered" });
    return;
  }

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

  const token = createAccessToken(userForToken);

  res.status(200).send({ token, name: savedUser.name, id: savedUser._id });
});

userRouter.post("/login", async (req, res) => {
  const body: IUserLogin = req.body;

  const foundUser: any = await User.findOne({ email: body.email });
  console.log("Found user", foundUser);

  if (!foundUser) {
    res
      .status(401)
      .json({ errorMsg: `No user with email '${body.email}' is registered` });
  }

  const typedPass: string = foundUser.passwordHash;

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

  const token = createAccessToken(userForToken);

  res.status(200).send({ token, name: foundUser.name, id: foundUser._id });
});

userRouter.delete("/", verifyToken, async (_req, res) => {
  await User.deleteMany({});
  res.json();
});

module.exports = userRouter;
