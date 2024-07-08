import React from "react";
import "./profile.css";
import { auth } from "./google/config";

function Profile({ user }) {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="profile-main">
      <img src={user.photoURL} alt="Profile Pic" className="profile-pic" />
      <h3 className="profile-name">{user.displayName}</h3>
      <p className="profile-email">{user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Profile;
