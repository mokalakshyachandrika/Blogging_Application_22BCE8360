import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./google/config";
import "./createArticle.css";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [user, setUser] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName);
        setAuthorName(user.displayName);
      } else {
        navigate("/login"); // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date();
    const readingTime = calculateReadingTime(content);

    console.log("Author Name:", authorName);

    const article = {
      title,
      content,
      time,
      readingTime,
      featured_image: featuredImage,
      uid: user.uid,
      author: authorName,
    };

    console.log("Article:", article);

    fetch("https://blogging-backend-omega.vercel.app/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Article created:", data);
        navigate("/profile"); // Redirect to profile after creation
      })
      .catch((error) => console.error("Error creating article:", error));
  };

  return (
    <div className="create-article-container">
      <h2 className="CA-heading">Create a New Article</h2>
      <form onSubmit={handleSubmit} className="create-article-form">
        <div className="form-group">
          <label className="CA-title" htmlFor="title">
            Title:
          </label>
          <br />
          <input
            type="text"
            id="title"
            placeholder="Title of the article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="CA-content" htmlFor="content">
            Content:
          </label>
          <br />
          <textarea
            id="content"
            placeholder="Full content of the article"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="CA-featuredImage" htmlFor="featuredImage">
            Featured Image URL:
          </label>
          <br />
          <input
            type="text"
            placeholder="Full link of the Image to be featured on this Article"
            id="featuredImage"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="CA-readingTime" htmlFor="readingTime">
            Reading Time (minutes):
          </label>
          <br />
          <input
            type="number"
            id="readingTime"
            placeholder="Estimated reading time in minutes"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            readOnly
          />
        </div>
        <button type="submit" className="create-article-button">
          Create Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
