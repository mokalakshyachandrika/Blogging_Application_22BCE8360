import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Headder from "./headder";
import Footer from "./footer";
import BlogsCard from "./blogsCard";
import Blogs from "./blogs";
import SingleArticle from "./singleArticle";
import "./App.css";
import Profile from "./profile";

function App() {
  const [blogs, setBlogs] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Headder />
          <h2 className="latest">Latest Articles :</h2>
          <div className="cardHolder">
            {blogs.map((blog) => (
              <BlogsCard
                key={blog._id}
                img={blog.featured_image}
                title={blog.title.replace(/<[^>]*>/g, "")}
                time={blog.created_at}
                content={blog.content.replace(/<[^>]*>/g, "")}
                link={`/articles/${blog._id}`}
              />
            ))}
          </div>

          <Footer />
        </>
      ),
    },
    {
      path: "/blogs",
      element: (
        <>
          <Headder />
          <h2 className="latest">All Blogs :</h2>
          <div className="allBlogs-cardHolder">
            {blogs.map((blog) => (
              <Blogs
                key={blog._id}
                img={blog.featured_image}
                title={blog.title.replace(/<[^>]*>/g, "")}
                time={blog.created_at}
                content={blog.content.replace(/<[^>]*>/g, "")}
                link={`/articles/${blog._id}`}
              />
            ))}
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/articles/:id",
      element: (
        <>
          <Headder />
          <SingleArticle />
          <Footer />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Headder />
          <Profile />
          <Footer />
        </>
      ),
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5001/articles")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
