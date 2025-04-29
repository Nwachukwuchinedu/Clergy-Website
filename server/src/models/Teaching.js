import mongoose from "mongoose";

const TeachingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  readingTime: {
    type: Number,
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Series",
  },
  authorName: {
    type: String,
    required: true,
  },
  relatedTeachings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teaching",
    },
  ],
});

export default mongoose.model("Teaching", TeachingSchema);
