import React from "react";
import "./profile.css";
import { auth } from "./google/config";
import BlogsCard from "./blogsCard";

function Profile({ user }) {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <>
      <div className="profile-main">
        <div className="profile-first">
          <img src={user.photoURL} alt="Profile Pic" className="profile-pic" />
          <h3 className="profile-name">{user.displayName}</h3>
          <p className="profile-email">{user.email}</p>
          <div className="profile-dash"></div>
        </div>
        <div className="profile-second">
          <h2>Your Articles :</h2>
          <BlogsCard />
        </div>
      </div>
    </>
  );
}

export default Profile;
