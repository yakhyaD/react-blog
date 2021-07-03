import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NewBlog from "./components/NewBlog";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <div className="content">
                  <Home />
                </div>
              </Route>
              <Route path="/create">
                <div className="content">
                  <NewBlog />
                </div>
              </Route>
              <Route path="/blogs/:id">
                <div className="content">
                  <BlogDetails />
                </div>
              </Route>
              <Route path="/blog/:id/edit">
                <div className="content">
                  <EditBlog />
                </div>
              </Route>
              <Route path="/login">
                <div className="content">
                  <Login />
                </div>
              </Route>
              <Route path="/register">
                <div className="content">
                  <Register />
                </div>
              </Route>
              <Route path="*">
                <div className="content">
                  <NotFound />
                </div>
              </Route>
            </Switch>
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
