import './App.scss';
import Nav from './components/Navigation/Nav';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Nav /> */}
        <Switch>
          <Route path="/news">new</Route>
          <Route path="/about">users</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">404 Not Found</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
