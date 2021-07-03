import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (email, password, history) => {
    setLoading(true);
    setError(null);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const login = async (email, password, history) => {
    setLoading(true);
    setError(null);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const logout = async (history) => {
    try {
      await auth.signOut();
      history.push("/login");
    } catch (err) {
      setError("Verify your credentialsa and Try again");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        currentUser,
        login,
        logout,
        loadingUser,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
