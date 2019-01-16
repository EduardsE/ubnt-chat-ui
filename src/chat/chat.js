import { compose } from 'recompose'
import { withSnackbar } from 'notistack'
import axios from 'axios';
import React from 'react';

import Grid from '@material-ui/core/Grid';

import './chat.scss';
import * as Socket from '../helpers/socket.helper.js';
import ChatEvents from './chat-events/chat-events.js'
import ConnectedUsers from './connected-users/connected-users.js'
import NewMessage from './new-message/new-message.js'
import TopBar from './top-bar/top-bar.js'


class Chat extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      users: [], // Currently connected user
      user: null // User connected from this client
    };

    Socket.connect(data => {
      // Deals with "Can't perform a React state update on an unmounted component"
      // https://github.com/material-components/material-components-web-react/
      // issues/434#issuecomment-449561024
      if (this._isMounted) {
        this.processConnectedUserChanges(data);
      }
    });
  }


  componentDidMount() {
    this._isMounted = true;
    this.getChatStatus();
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  /*
    Retrieves currently connected users and this clients data
    stored in session.
  */
  getChatStatus() {
    axios.get(`${process.env.REACT_APP_API_URL}/chat/status`).then(res => {
      this.setState({
        user: res.data.self,
        users: res.data.users
      });
    }).catch(err => {
      if (err.response) {
        this.props.enqueueSnackbar(err.response.data.error, { variant: 'error' });
      } else {
        this.props.enqueueSnackbar('Server unavailable', { variant: 'error' });
      }
      this.props.history.push('/')
    });
  }


  /*
    Adds or removes online users in user list depending on received event.
  */
  processConnectedUserChanges(data) {
    const event = data['event'];
    delete data['event'];
    let users = [...this.state.users]

    switch(event) {
      case 'user-connected':
        users.unshift(data); // New users at the fron of list
        this.setState({ users })
        break;
      case 'user-disconnected':
        users = users.filter(u => u.username !== data.username);
        this.setState({ users })
        break;
      default:
        return;
    }
  }

  /*
  * Adds or removes online users in user list depending on received event.
  */
  disconnect() {
    axios.post(
      `${process.env.REACT_APP_API_URL}/auth/logout`
    ).then(() => {
      this.props.history.push('/', { disconnectionDueTo: 'loggedOut' })
    }).catch((err) => {
      this.props.history.push('/', { disconnectionDueTo: 'loggedOut' })
    })
  }


  render() {
    return (
      <Grid container className="container">
        <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
        <Grid className="middle" item xs={12} sm={8} md={6} lg={4}>
          <TopBar history={this.props.history} />
          <ConnectedUsers users={this.state.users} />
          <ChatEvents
            history={this.props.history}
            users={this.state.users}
            user={this.state.user}
          ></ChatEvents>
          <NewMessage/>
        </Grid>
        <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
      </Grid>
    );
  }
}

export default compose(
  withSnackbar
)(Chat)
