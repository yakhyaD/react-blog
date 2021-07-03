import { useContext, createContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loadingData, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    db.collection("blogs")
      .get()
      .then((data) => {
        let items = [];
        data.forEach((doc) => {
          items.push({
            id: doc.id,
            body: doc.data().body,
            title: doc.data().title,
            author: doc.data().author,
          });
        });
        setLoading(false);
        setBlogs(items);
        setError("");
      })
      .catch((err) => setError(err.message));
  }, []);

  const addBlog = async (blog, history) => {
    setLoading(true);
    setError(null);
    try {
      const newBlog = await db.collection("blogs").add(blog);
      setBlogs((blogs) => [...blogs, newBlog]);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const getBlogDetails = (id) => {
    setLoading(true);
    setError(null);
    db.doc(`/blogs/${id}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw new Error("Not Found");
        }
        setBlog({ ...doc.data(), id: doc.id });
        setLoading(false);
        return;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        return;
      });
  };

  const deleteBlog = async (id, history) => {
    setLoading(false);
    setError(null);
    try {
      await db.doc(`/blogs/${id}`).delete();
      setLoading(false);
      const index = blogs.findIndex((blog) => blog.id === id);
      blogs.splice(1, index);
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const editBlog = async (id, blog, history) => {
    setLoading(true);
    setError(null);
    try {
      await db.doc(`/blogs/${id}`).update(blog);
      blog.id = id;
      const index = blogs.findIndex((blog) => blog.id === id);
      blogs[index] = blog;
      setBlog(blog);
      setLoading(false);
      history.push(`/blogs/${id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <BlogContext.Provider
      value={{
        addBlog,
        blogs,
        blog,
        error,
        loadingData,
        getBlogDetails,
        deleteBlog,
        editBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
