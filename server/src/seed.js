import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Teaching from "./models/Teaching.js";
import Series from "./models/Series.js";
import Tag from "./models/Tag.js";
import Comment from "./models/Comment.js";
import Newsletter from "./models/Newsletter.js";
import Contact from "./models/Contact.js";
import { faker } from "@faker-js/faker";


// Initialize dotenv
dotenv.config();

// Connect to database
connectDB();

// Helper functions
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateDummyData = async () => {
  try {
    // Clear existing data
    await mongoose.connection.dropDatabase();
    console.log("Database cleared");

    // Create tags
    const tagNames = [
      "grace",
      "faith",
      "love",
      "hope",
      "salvation",
      "prayer",
      "bible",
      "church",
      "holiness",
      "worship",
    ];
    const tags = await Tag.insertMany(tagNames.map((name) => ({ name })));
    console.log(`${tags.length} tags created`);

    // Create series
    const seriesData = [
      {
        title: "Foundations of Faith",
        slug: "foundations-of-faith",
        description:
          "A comprehensive series on the core beliefs of Christianity.",
        coverImage: "https://example.com/images/series1.jpg",
      },
      {
        title: "Walking in Grace",
        slug: "walking-in-grace",
        description:
          "Discover the transformative power of God's grace in your daily life.",
        coverImage: "https://example.com/images/series2.jpg",
      },
      {
        title: "The Power of Prayer",
        slug: "power-of-prayer",
        description:
          "Learn how to develop a deeper prayer life that connects you with God.",
        coverImage: "https://example.com/images/series3.jpg",
      },
      {
        title: "Biblical Wisdom",
        slug: "biblical-wisdom",
        description:
          "Practical teachings drawn from the wisdom literature of the Bible.",
        coverImage: "https://example.com/images/series4.jpg",
      },
      {
        title: "Living by Faith",
        slug: "living-by-faith",
        description:
          "Exploring what it means to truly trust God in every area of life.",
        coverImage: "https://example.com/images/series5.jpg",
      },
    ];
    const series = await Series.insertMany(seriesData);
    console.log(`${series.length} series created`);

    // Create teachings
    const teachings = [];
    const authors = [
      "Pastor Michael Johnson",
      "Rev. Sarah Williams",
      "Dr. David Thompson",
      "Minister Rachel Chen",
      "Bishop James Wilson",
    ];

    // Generate 50 teachings
    for (let i = 0; i < 50; i++) {
      const seriesIndex = Math.floor(Math.random() * series.length);
      const tagCount = Math.floor(Math.random() * 3) + 1; // 1-3 tags
      const selectedTags = getRandomItems(tags, tagCount);
      const readingTime = Math.floor(Math.random() * 15) + 5; // 5-20 minutes

      const title = faker.lorem.words(Math.floor(Math.random() * 4) + 3);
      const slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      const teaching = {
        title,
        slug,
        excerpt: faker.lorem.paragraph(),
        content: `<p>${faker.lorem.paragraphs(5, "</p><p>")}</p>`,
        publishedAt: faker.date.between({
          from: "2020-01-01",
          to: new Date(),
        }),
        readingTime,
        tags: selectedTags.map((tag) => tag._id),
        series: Math.random() > 0.3 ? series[seriesIndex]._id : null, // 30% chance of no series
        authorName: authors[Math.floor(Math.random() * authors.length)],
      };

      teachings.push(teaching);
    }

    const createdTeachings = await Teaching.insertMany(teachings);
    console.log(`${createdTeachings.length} teachings created`);

    // Add related teachings (each teaching gets 1-3 related teachings)
    for (const teaching of createdTeachings) {
      const relatedCount = Math.floor(Math.random() * 3) + 1;
      const relatedTeachings = getRandomItems(
        createdTeachings.filter(
          (t) => t._id.toString() !== teaching._id.toString()
        ),
        relatedCount
      ).map((t) => t._id);

      await Teaching.findByIdAndUpdate(teaching._id, {
        relatedTeachings,
      });
    }
    console.log("Related teachings assigned");

    // Create comments (3-10 comments per teaching)
    const comments = [];
    for (const teaching of createdTeachings) {
      const commentCount = Math.floor(Math.random() * 8) + 3;
      for (let i = 0; i < commentCount; i++) {
        comments.push({
          teaching: teaching._id,
          name: faker.person.fullName(), // Updated to faker.person
          email: faker.internet.email(),
          content: faker.lorem.paragraph(),
          date: faker.date.between({
            from: teaching.publishedAt,
            to: new Date(),
          }),
        });
      }
    }

    const createdComments = await Comment.insertMany(comments);
    console.log(`${createdComments.length} comments created`);

    // Create newsletter subscribers
    const subscribers = [];
    for (let i = 0; i < 20; i++) {
      subscribers.push({
        email: faker.internet.email(),
        subscribedAt: faker.date.past(),
      });
    }

    const createdSubscribers = await Newsletter.insertMany(subscribers);
    console.log(`${createdSubscribers.length} newsletter subscribers created`);

    // Create contact form submissions
    const contacts = [];
    const subjects = [
      "General Inquiry",
      "Prayer Request",
      "Teaching Feedback",
      "Technical Issue",
      "Partnership Opportunity",
    ];

    for (let i = 0; i < 15; i++) {
      contacts.push({
        name: faker.person.fullName(), // Updated to faker.person
        email: faker.internet.email(),
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        message: faker.lorem.paragraphs(2),
        createdAt: faker.date.past(),
      });
    }

    const createdContacts = await Contact.insertMany(contacts);
    console.log(`${createdContacts.length} contact submissions created`);

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

generateDummyData();