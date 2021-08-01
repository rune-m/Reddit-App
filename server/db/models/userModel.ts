import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
const autopopulate = require("mongoose-autopopulate");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      autopopulate: false,
    },
  ],
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(autopopulate);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash;
  },
});

export default mongoose.model("User", userSchema);
