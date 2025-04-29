import Teaching from "../models/Teaching.js";
import Series from "../models/Series.js";
import Tag from "../models/Tag.js";
// Get all teachings with pagination and filtering
export const getAllTeachings = async (req, res) => {
  try {
    const {
      search,
      seriesId,
      tags,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    if (seriesId) {
      query.series = seriesId;
    }

    if (tags) {
      const tagIds = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagIds };
    }

    if (startDate || endDate) {
      query.publishedAt = {};
      if (startDate) query.publishedAt.$gte = new Date(startDate);
      if (endDate) query.publishedAt.$lte = new Date(endDate);
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { publishedAt: -1 },
      populate: ["series", "tags"],
    };

    const teachings = await Teaching.paginate(query, options);

    const response = {
      teachings: teachings.docs.map((doc) => ({
        id: doc._id,
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt,
        content: doc.content,
        publishedAt: doc.publishedAt,
        readingTime: doc.readingTime,
        tags: doc.tags.map((tag) => tag.name),
        seriesName: doc.series ? doc.series.title : null,
        authorName: doc.authorName,
      })),
      pagination: {
        page: teachings.page,
        totalPages: teachings.totalPages,
        total: teachings.totalDocs,
      },
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single teaching by slug
export const getTeachingBySlug = async (req, res) => {
  try {
    const teaching = await Teaching.findOne({ slug: req.params.slug })
      .populate("series")
      .populate("tags")
      .populate("relatedTeachings", "title slug");

    if (!teaching) {
      return res.status(404).json({ message: "Teaching not found" });
    }

    const response = {
      id: teaching._id,
      title: teaching.title,
      slug: teaching.slug,
      content: teaching.content,
      publishedAt: teaching.publishedAt,
      readingTime: teaching.readingTime,
      tags: teaching.tags.map((tag) => tag.name),
      seriesName: teaching.series ? teaching.series.title : null,
      authorName: teaching.authorName,
      relatedTeachings: teaching.relatedTeachings.map((t) => ({
        id: t._id,
        title: t.title,
        slug: t.slug,
      })),
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get latest teaching
export const getLatestTeaching = async (req, res) => {
  try {
    const teaching = await Teaching.findOne()
      .sort({ publishedAt: -1 })
      .populate("series")
      .limit(1);

    if (!teaching) {
      return res.status(404).json({ message: "No teachings found" });
    }

    const response = {
      id: teaching._id,
      title: teaching.title,
      slug: teaching.slug,
      excerpt: teaching.excerpt,
      publishedAt: teaching.publishedAt,
      readingTime: teaching.readingTime,
      seriesName: teaching.series ? teaching.series.title : null,
      authorName: teaching.authorName,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
