import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Headder from "./headder";
import Footer from "./footer";
import BlogsCard from "./blogsCard";
import Blogs from "./blogs";
import SingleArticle from "./singleArticle";
import Profile from "./profile";
import CreateArticle from "./createArticle";
import EditArticle from "./editArticle";
import Login from "./google/login";
import { auth } from "./google/config";

import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/articles")
      .then((response) => response.json())
      .then((data) => {
        // Sort articles by time descending (newest to oldest)
        data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setBlogs(data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Headder />
          {user ? (
            <>
              <h2 className="latest">Latest Articles :</h2>
              <div className="cardHolder">
                {blogs.map((blog) => (
                  <BlogsCard
                    key={blog._id}
                    img={blog.featured_image}
                    title={blog.title.replace(/<[^>]*>/g, "")}
                    time={new Date(blog.time).toLocaleDateString()}
                    readingTime={blog.readingTime}
                    author={blog.author}
                    content={blog.content.replace(/<[^>]*>/g, "")}
                    link={`/articles/${blog._id}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <Login />
          )}
          <Footer />
        </>
      ),
    },
    {
      path: "/blogs",
      element: (
        <>
          <Headder />
          {user ? (
            <>
              <h2 className="latest">All Blogs :</h2>
              <div className="allBlogs-cardHolder">
                {blogs.map((blog) => (
                  <Blogs
                    key={blog._id}
                    img={blog.featured_image}
                    title={blog.title.replace(/<[^>]*>/g, "")}
                    time={new Date(blog.time).toLocaleDateString()}
                    readingTime={blog.readingTime}
                    author={blog.author}
                    content={blog.content.replace(/<[^>]*>/g, "")}
                    link={`/articles/${blog._id}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <Login />
          )}
          <Footer />
        </>
      ),
    },
    {
      path: "/articles/:id",
      element: (
        <>
          <Headder />
          {user ? <SingleArticle /> : <Login />}
          <Footer />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Headder />
          {user ? <Profile user={user} /> : <Login />}
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Headder />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/create",
      element: (
        <>
          <Headder />
          {user ? <CreateArticle /> : <Login />}
          <Footer />
        </>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <>
          <Headder />
          {user ? <EditArticle /> : <Login />}
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
