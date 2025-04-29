import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  teaching: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teaching",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/?d=mp",
  },
});

export default mongoose.model("Comment", CommentSchema);
