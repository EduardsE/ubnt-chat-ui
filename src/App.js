import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import React, { Component } from 'react';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import Login from './login/login';
import Chat from './chat/chat';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
});

class App extends Component {
  constructor() {
    super()
    axios.defaults.withCredentials = true
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/chat" component={Chat} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
