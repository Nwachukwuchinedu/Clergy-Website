import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
});

SeriesSchema.virtual("teachingCount", {
  ref: "Teaching",
  localField: "_id",
  foreignField: "series",
  count: true,
});

export default mongoose.model("Series", SeriesSchema);
