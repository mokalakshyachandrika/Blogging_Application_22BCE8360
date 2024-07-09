import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./google/config";
import logo from "./assets/Logo.png";
import "./headder.css";

function Headder() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <>
      <div className="main">
        <div>
          <Link to="/">
            <img src={logo} alt="Blogging Logo" className="logoimg" />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="search">
          <IoSearch size={35} />
        </div>
        {user ? (
          <button onClick={signOut} className="logout-button">
            Logout
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Headder;
