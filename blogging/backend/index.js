// Import necessary modules
import { connect, Schema, model } from "mongoose";
import express, { json } from "express";
import cors from "cors";

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://mokalakshya:MongoDB@cluster92955.gupvlnw.mongodb.net/",
      {
        dbName: "blogging", // Database name
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to blogging database");
  } catch (err) {
    console.error(err);
  }
};

// Call the connectDB function to establish the database connection
connectDB();

// Define the schema for articles
const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Date, required: true },
    readingTime: { type: Number, required: true },
    featured_image: { type: String, required: true },
    uid: { type: String, required: true },
    author: { type: String, required: true },
  },
  { versionKey: false }
);

// Create a model for articles based on the schema
const Article = model("articles", articleSchema);
Article.createIndexes(); // Ensure indexes are created for efficient queries

// Initialize the Express app
const app = express();
app.use(json()); // Middleware to parse JSON bodies

// Configure CORS to allow requests from your frontend domain
app.use(
  cors({
    origin: [
      "https://blogging-client-six.vercel.app",
      "*",
      "mongodb+srv://mokalakshya:MongoDB@cluster92955.gupvlnw.mongodb.net/",
      "blogging-backend-1qmuft5pd-moka-lakshyas-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  })
);

// Define a route to test if the app is working
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

// Route to get all articles sorted by time (newest to oldest)
app.get("/articles", async (req, resp) => {
  try {
    const articles = await Article.find().sort({ time: -1 });
    resp.send(articles);
  } catch (e) {
    resp.status(500).send("Something Went Wrong");
  }
});

// Route to get a specific article by ID
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
    // Log the request body to verify the content being sent
    console.log("Request Body:", req.body);

    // Check if the 'author' field is present in the request body
    if (!req.body.author) {
      return resp.status(400).send("Author is required");
    }

    const article = new Article(req.body);
    article
      .save()
      .then((savedArticle) => {
        console.log("Article saved successfully:", savedArticle);
        resp.json(savedArticle); // Send the saved article as response
      })
      .catch((error) => {
        console.error("Error saving article:", error);
        resp.status(500).send("Error saving article");
      });
  } catch (e) {
    console.error(e);
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
    const { id } = req.params;
    const { title, content, featured_image, readingTime } = req.body;

    // Calculate reading time (if needed)
    const wordCount = content.split(/\s+/).length;
    const avgWordsPerMinute = 200; // Average reading speed
    const calculatedReadingTime = Math.ceil(wordCount / avgWordsPerMinute);

    // Prepare the updated article data
    const updatedArticle = {
      title,
      content,
      featured_image,
      readingTime: readingTime || calculatedReadingTime,
      time: new Date(), // Update time to current time
    };

    // Find the article by ID and update it
    const article = await Article.findByIdAndUpdate(id, updatedArticle, {
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

// Route to search articles by title or content
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

// Define the port number for the app to listen on
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

export default app;
