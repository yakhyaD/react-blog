import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const history = useHistory();
  const email = useRef();
  const password = useRef();
  const { login, error, loadingUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email.current.value, password.current.value, history);
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="alert-danger">{error}</div>}
        <div className="form-group">
          <label>Email:</label>
          <input required type="email" ref={email} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            required
            autoComplete={password}
            type="password"
            ref={password}
          />
        </div>
        <input
          disabled={loadingUser}
          className="btn"
          type="submit"
          value="Login"
        />
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};
export default Login;
