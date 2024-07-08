import { IoSearch } from "react-icons/io5";

import logo from "./assets/Logo.png";
import "./headder.css";
import { Link } from "react-router-dom";

function Headder() {
  return (
    <>
      <div className="main">
        <div>
          <Link to="/">
            {" "}
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
      </div>
    </>
  );
}

export default Headder;
