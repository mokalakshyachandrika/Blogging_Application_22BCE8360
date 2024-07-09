import React from "react";
import "./articleListItem.css";

function ArticleListItem({ article, onEdit, onDelete }) {
  return (
    <div className="article-list-item">
      <img
        src={article.featured_image}
        alt={article.title}
        className="article-img"
      />
      <div className="article-details">
        <h3 className="article-title">
          {article.title.replace(/<[^>]*>/g, "")}
        </h3>
        <p className="article-content">
          {article.content.replace(/<[^>]*>/g, "")}
        </p>
      </div>
      <div className="article-actions">
        <button className="edit-btn" onClick={() => onEdit(article._id)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(article._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ArticleListItem;
