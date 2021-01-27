import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProfileComponent from "./components/ProfileComponent";
import Home from "./components/Home";
import OtherUserDetails from "./components/OtherUserDetails";
import Login from './components/Login';
import Signup from './components/Signup';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
        <Route path="/" exact render={(props) => <Login  {...props}/>} />
        <Route path="/signup" exact render={(props) => <Signup  {...props}/>} />
          <Route path="/home" exact render={(props) => <Home {...props} />} />
          <Route
            path="/profile"
            exact
            render={(props) => <ProfileComponent {...props} />}
          />
          <Route
            path="/profile/edit/position/:id"
            exact
            render={(props) => <ProfileComponent {...props} />}
          />
          <Route
            path="/other-user-details/:userId"
            component={OtherUserDetails}
          />
        </Router>
      </div>
    );
  }
}

export default App;
