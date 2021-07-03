import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

const NewBlog = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const blog = { title, body, author };
  const history = useHistory();
  const { addBlog, error, loadingData } = useBlog();

  const onSubmit = (e) => {
    e.preventDefault();
    addBlog(blog, history);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <h3 className="error">{error}</h3>}
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
          rows="5"
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
        value="Create Blog"
        disabled={loadingData}
      />
    </form>
  );
};

export default NewBlog;
