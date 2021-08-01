import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
const autopopulate = require("mongoose-autopopulate");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: String,
  upvotes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: false,
  },
});

postSchema.plugin(uniqueValidator);
postSchema.plugin(autopopulate);

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
