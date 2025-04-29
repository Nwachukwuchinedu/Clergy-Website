import Series from "../models/Series.js";
import Teaching from "../models/Teaching.js";

// Get all series
export const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find().populate("teachingCount");

    const response = {
      series: series.map((s) => ({
        id: s._id,
        title: s.title,
        slug: s.slug,
        description: s.description,
        coverImage: s.coverImage,
        teachingCount: s.teachingCount,
      })),
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single series by slug
export const getSeriesBySlug = async (req, res) => {
  try {
    const series = await Series.findOne({ slug: req.params.slug });
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    const teachings = await Teaching.find({ series: series._id })
      .select("title slug excerpt publishedAt readingTime")
      .sort({ publishedAt: -1 });

    const response = {
      id: series._id,
      title: series.title,
      slug: series.slug,
      description: series.description,
      coverImage: series.coverImage,
      teachings: teachings.map((t) => ({
        id: t._id,
        title: t.title,
        slug: t.slug,
        excerpt: t.excerpt,
        publishedAt: t.publishedAt,
        readingTime: t.readingTime,
      })),
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
