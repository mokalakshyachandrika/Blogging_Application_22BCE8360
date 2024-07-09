import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./google/config";
import logo from "./assets/Logo.png";
import "./headder.css";

function Headder() {
  const [user, setUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchField, setShowSearchField] = useState(false);
  const navigate = useNavigate();

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

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query) {
      fetch(`http://localhost:5001/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (id) => {
    setSearchInput("");
    setSearchResults([]);
    navigate(`/articles/${id}`);
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
          <div
            className={`search-field ${showSearchField ? "active" : "active"}`}
          >
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="SEARCH FOR THE ARTICLES"
              onFocus={() => setShowSearchField(true)}
              onBlur={() => setShowSearchField(false)}
            />
            <IoSearch size={20} className="search-icon" />
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((result) => (
                  <li
                    key={result._id}
                    onMouseDown={() => handleSearchResultClick(result._id)}
                  >
                    {result.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
