import Tag from "../models/Tag.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json({ tags: tags.map((t) => t.name) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


