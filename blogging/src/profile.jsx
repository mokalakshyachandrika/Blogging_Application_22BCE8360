import React, { useState, useEffect } from "react";
import "./profile.css";
import { auth } from "./google/config";
import ArticleListItem from "./articleListItem";
import blankProfilePicture from "./assets/blank-profile-picture.webp";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Profile({ user }) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    fetch(`https://blogging-backend-omega.vercel.app/articles/user/${user.uid}`)
      .then((response) => response.json())
      .then((data) => {
        // Sort articles by time descending (newest to oldest)
        data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setArticles(data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [user.uid]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    fetch(`https://blogging-backend-omega.vercel.app/articles/${id}`, {
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
              onEdit={handleEdit} // Pass handleEdit function to ArticleListItem
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
