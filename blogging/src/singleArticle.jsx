import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./singleArticle.css";

function SingleArticle() {
  const { id } = useParams(); // Fetch the article ID from URL params
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the specific article based on ID
    fetch(`https://blogging-backend-omega.vercel.app/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Article Data:", data); // Debug statement
        setArticle(data);
      })
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  if (!article) {
    return <p>Loading...</p>; // Placeholder while article is loading
  }
  const actualTime = new Date(article.time).toLocaleDateString();

  return (
    <div className="single-article">
      <img src={article.featured_image} alt="Featured Image" />
      <h1>{article.title}</h1>
      <div className="single-meta">
        <p className="singleArticle-meta">Published Time: {actualTime}</p>
        <p className="singleArticle-meta">
          Reading Time: {article.readingTime} Minutes
        </p>
        <p className="singleArticle-meta">Author: {article.author}</p>
      </div>
      <div className="singleArticle-content">
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default SingleArticle;
