import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Login from './login/login';
import Chat from './chat/chat';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/chat" component={Chat} />
        </div>
      </Router>
    )
  }
}

export default App;
