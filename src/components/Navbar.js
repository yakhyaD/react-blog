import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout(history);
  };

  return (
    <nav className="navbar">
      <h1>The Hi Shin Blog</h1>
      <div className="links">
        {location.pathname !== "/" ? <Link to="/">Home</Link> : ""}
        {currentUser && (
          <Link
            to="/create"
            style={{
              color: "white",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
            }}
          >
            New Blog
          </Link>
        )}
        {!currentUser ? (
          <Link to="/login">Login</Link>
        ) : (
          <form className="logout" onSubmit={handleSubmit}>
            <button type="sbumit">Logout</button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
