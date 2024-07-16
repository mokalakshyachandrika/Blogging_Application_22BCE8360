import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editArticle.css";

function EditArticle() {
  const { id } = useParams(); // Assuming you're passing the article ID via URL params
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Fetch the article details based on the ID when component mounts
    fetch(`https://blogging-backend-omega.vercel.app/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setFeaturedImage(data.featured_image);
        setReadingTime(data.readingTime);
      })
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      title,
      content,
      featured_image: featuredImage,
      readingTime, // This will be updated locally
    };

    const wordCount = content.split(/\s+/).length;
    const avgWordsPerMinute = 100;
    const calculatedReadingTime = Math.ceil(wordCount / avgWordsPerMinute);

    // Update article object with calculated reading time and current time
    const updatedArticle = {
      ...article,
      readingTime: calculatedReadingTime,
      time: new Date(),
    };

    fetch(
      `https://blogging-backend-omega.vercel.app/articles/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
      },
      { mode: "no-cors" }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Article updated:", data);
        navigate("/profile"); // Redirect to profile after update
      })
      .catch((error) => console.error("Error updating article:", error));
  };

  return (
    <div className="edit-article-container">
      <h2 className="EA-heading">Edit Article</h2>
      <form onSubmit={handleSubmit} className="edit-article-form">
        <div className="form-group">
          <label className="EA-title" htmlFor="title">
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
          <label className="EA-content" htmlFor="content">
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
          <label className="EA-featuredImage" htmlFor="featuredImage">
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
          <label className="EA-readingTime" htmlFor="readingTime">
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
        <button type="submit" className="edit-article-button">
          Update Article
        </button>
      </form>
    </div>
  );
}

export default EditArticle;
