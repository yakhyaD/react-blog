import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

const EditBlog = () => {
  const { id } = useParams();
  const history = useHistory();
  const { getBlogDetails, blog, error, editBlog, loadingData } = useBlog();
  const [title, setTitle] = useState(blog?.title);
  const [body, setBody] = useState(blog?.body);
  const [author, setAuthor] = useState(blog?.author);
  const newBlog = { title, author, body };

  useEffect(() => {
    if (id && !blog) {
      getBlogDetails(id);
    }
  }, [id, blog, getBlogDetails]);
  useEffect(() => {
    setTitle(blog?.title);
    setAuthor(blog?.author);
    setBody(blog?.body);
  }, [blog]);
  const handleSubmit = (e) => {
    e.preventDefault();
    editBlog(id, newBlog, history);
  };
  return (
    <>
      {!loadingData && blog ? (
        <form className="form" onSubmit={handleSubmit}>
          {error && <h3 className="alert-danger">{error}</h3>}
          <div className="form-group">
            <label>Tilte:</label>
            <input
              required
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Details:</label>
            <textarea
              required
              rows="10"
              name="body"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <select
              required
              name="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option>mario</option>
              <option>Isayama</option>
            </select>
          </div>
          <input
            className="btn"
            type="submit"
            value="Edit Blog"
            disabled={loadingData}
          />
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default EditBlog;
