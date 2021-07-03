import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Register = () => {
  const history = useHistory();
  const username = useRef();
  const password = useRef();
  const password2 = useRef();
  const email = useRef();
  const [inputError, setError] = useState(null);
  const { register, loadingUser, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.current.value !== password2.current.value) {
      return setError("Password do not match");
    }
    register(email.current.value, password.current.value, history);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="alert-danger">{error}</div>}
      {inputError && <div className="alert-danger">{inputError}</div>}
      <div className="form-group">
        <label>Full Name:</label>
        <input
          required
          autoFocus
          autoComplete={username}
          type="text"
          ref={username}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          required
          autoFocus
          autoComplete={email}
          type="email"
          ref={email}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          required
          autoFocus
          autoComplete={password}
          type="password"
          ref={password}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          required
          autoFocus
          autoComplete={password2}
          type="password"
          ref={password2}
        />
      </div>
      <input
        disabled={loadingUser}
        className="btn"
        type="submit"
        value="Register"
      />
    </form>
  );
};
export default Register;
