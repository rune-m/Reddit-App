import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: String,
  upvotes: Number,
});

postSchema.plugin(uniqueValidator);

postSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash;
  },
});

export default mongoose.model("Post", postSchema);
