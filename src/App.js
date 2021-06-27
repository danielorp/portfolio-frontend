import './App.css';
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Post from './Pages/Post/Post'
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function PrivateRoute({ component: Component, logged_in, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => logged_in === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default function App() {

  const [token, setToken] = useState();

  return (
    <div className="wrapper">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/login" render={() =>
              <Login setToken={setToken} />
            } />
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
            <PrivateRoute logged_in={false} path='/post' component={Post} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}