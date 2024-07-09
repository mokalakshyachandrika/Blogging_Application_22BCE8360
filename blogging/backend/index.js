// Import necessary modules
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/", {
      dbName: "blogging", // Database name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to blogging database");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

// Schema for articles
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  readingTime: {
    type: Number,
    required: true,
  },
  featured_image: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true, // Firebase user ID
  },
});
const Article = mongoose.model("articles", ArticleSchema);
Article.createIndexes();

// For backend and express
const app = express();
console.log("App listen at port 5001");
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("App is Working");
});

// Route to get all articles
app.get("/articles", async (req, resp) => {
  try {
    const articles = await Article.find();
    resp.send(articles);
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

// Route to delete an article by ID
app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne({ _id: id });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to upload a new article
app.post("/articles", async (req, resp) => {
  try {
    const article = new Article(req.body);
    let result = await article.save();
    resp.send(result);
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

// Route to get articles by user ID
app.get("/articles/user/:uid", async (req, resp) => {
  try {
    const articles = await Article.find({ uid: req.params.uid });
    resp.send(articles);
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

// Route to edit an article
app.put("/articles/:id", async (req, resp) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    resp.send(article);
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

// Route to delete an article
app.delete("/articles/:id", async (req, resp) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    resp.send("Article Deleted");
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

// Route to search articles
app.get("/search", async (req, resp) => {
  try {
    const { query } = req.query;
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    resp.send(articles);
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App listen at port ${PORT}`);
});
