import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import React, { Component, Fragment } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Chat from './chat/chat';
import Login from './login/login';

// For material ui theme customization.
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
          <Fragment>
            <Route exact path="/" component={Login} />
            <Route path="/chat" component={Chat} />
          </Fragment>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
