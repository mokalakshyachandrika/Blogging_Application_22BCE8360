import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./singleArticle.css";

function SingleArticle() {
  const { id } = useParams(); // Fetch the article ID from URL params
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the specific article based on ID
    fetch(`http://localhost:5001/articles/${id}`)
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

  return (
    <div className="single-article">
      <img src={article.featured_image} alt="Featured Image" />
      <h1>{article.title}</h1>
      <p className="singleArticle-meta">{article.time}</p>
      <div className="singleArticle-content">
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default SingleArticle;
