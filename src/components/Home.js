import BlogList from "./BlogList";
import { useBlog } from "../context/BlogContext";

const Home = () => {
  const { blogs, loadingData, error } = useBlog();
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {loadingData && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
