import React, { useState, useEffect } from "react";
import "./profile.css";
import { auth } from "./google/config";
import ArticleListItem from "./articleListItem";
import blankProfilePicture from "./assets/blank-profile-picture.webp";
import { Link } from "react-router-dom";

function Profile({ user }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/articles/user/${user.uid}`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, [user.uid]);

  const handleEdit = (id) => {
    // Handle the edit logic here
    console.log(`Edit article with id: ${id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/articles/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setArticles(articles.filter((article) => article._id !== id));
        } else {
          console.error("Error deleting article");
        }
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  return (
    <>
      <div className="profile-main">
        <div className="profile-first">
          <img
            src={user.photoURL ? user.photoURL : blankProfilePicture}
            alt="Profile Pic"
            className="profile-pic"
          />
          <h3 className="profile-name">{user.displayName}</h3>
          <p className="profile-email">{user.email}</p>

          <div className="profile-dash"></div>
        </div>
        <div className="profile-create">
          <Link to={"/create"} className="profile-create-text">
            Create Post
          </Link>
        </div>
        <div className="profile-second">
          <h2 className="your-articles">Your Articles :</h2>
          {articles.map((article) => (
            <ArticleListItem
              key={article._id}
              article={article}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
