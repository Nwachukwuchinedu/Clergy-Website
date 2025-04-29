import Comment from "../models/Comment.js";
// Submit a comment
export const submitComment = async (req, res) => {
  try {
    const { teachingId, name, email, content } = req.body;

    const comment = new Comment({
      teaching: teachingId,
      name,
      email,
      content,
    });

    const savedComment = await comment.save();

    res.status(201).json({
      id: savedComment._id,
      teachingId: savedComment.teaching,
      name: savedComment.name,
      email: savedComment.email,
      content: savedComment.content,
      date: savedComment.date,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a teaching
export const getCommentsForTeaching = async (req, res) => {
  try {
    const { teachingId } = req.query;

    const comments = await Comment.find({ teaching: teachingId }).sort({
      date: -1,
    });

    const response = {
      comments: comments.map((c) => ({
        id: c._id,
        name: c.name,
        content: c.content,
        date: c.date,
        avatar: c.avatar,
      })),
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
