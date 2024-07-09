import { Link } from "react-router-dom";
import "./blogsCard.css";

function BlogsCard(props) {
  return (
    <>
      <Link to={props.link}>
        <div className="card">
          <img className="featuredImage" src={props.img} alt="Featured Image" />
          <h2 className="card-title">{props.title}</h2>
          <div className="card-time">
            <p className="card-readingTime">
              Read Time: {props.readingTime} Minutes
            </p>
            <p className="card-published">Published on: {props.time}</p>
          </div>
          <div className="card-description">
            <p>{props.content}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default BlogsCard;
