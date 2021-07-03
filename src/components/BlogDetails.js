import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/UserContext";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { blog, loadingData, error, getBlogDetails, deleteBlog } = useBlog();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (id && !blog) {
      getBlogDetails(id);
    }
  }, [id, getBlogDetails, blog]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (!window.confirm("do you want to delete this blog?")) {
      return;
    }
    deleteBlog(id, history);
  };

  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {loadingData && <div>Loading...</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <span>{blog.author}</span>
          <p>{blog.body}</p>
          {currentUser && (
            <div className="btn-block">
              <div className="blog-edit">
                <a className="btn" href={`/blog/${blog.id}/edit`}>
                  Edit
                </a>
              </div>
              <form className="blog-delete" onSubmit={handleDelete}>
                <input className="btn" type="submit" value="Delete" />
              </form>
            </div>
          )}
        </article>
      )}
    </div>
  );
};
export default BlogDetails;
