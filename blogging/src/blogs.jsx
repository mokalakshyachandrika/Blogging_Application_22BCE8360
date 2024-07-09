import { Link } from "react-router-dom";

import "./blogs.css";

function Blogs(props) {
  return (
    <>
      <Link to={props.link}>
        <div className="allBlog-card">
          <img
            className="allBlog-card-featuredImage"
            src={props.img}
            alt="Featured Image"
          />
          <h2 className="allBlog-card-title">{props.title}</h2>
          <p className="allBlog-card-meta">Published on: {props.time}</p>
          <p className="allBlog-card-meta">Reading Time: {props.readingTime}</p>
          <div className="allBlog-card-description">
            <p>{props.content}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
export default Blogs;
