import axios from 'axios';
import React from "react";

import Grid from '@material-ui/core/Grid';

import * as Socket from '../helpers/socket.helper.js';
import ChatEvents from './chat-events/chat-events.js'
import ConnectedUsers from './connected-users/connected-users.js'
import NewMessage from './new-message/new-message.js'
import TopBar from './top-bar/top-bar.js'

import './chat.scss';

class Chat extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {};
    this.classes = props.classes;

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

    axios.get(`${process.env.REACT_APP_API_URL}/chat/status`).then(data => {
      this.setState({
        user: data.data.self,
        users: data.data.users
      });
    });
  }


  componentWillMount() {
    document.body.style.backgroundColor = "white";
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.body.style.backgroundColor = null;
  }


  processConnectedUserChanges(data) {
    const event = data['event'];
    delete data['event'];
    let users = [...this.state.users]

    switch(event) {
      case 'user-connected':
        users.unshift(data);
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

  async disconnect() {
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`).then(() => {
        this.props.history.push('/', { disconnectionDueTo: 'loggedOut' })
      });
    } catch (httpError) {
      console.log(httpError);
    }
  }


  render() {
    return (
      <Grid container className="container">
        <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
        <Grid className="middle" item xs={12} sm={8} md={6} lg={4}>
          <TopBar history={this.props.history}></TopBar>
          <ConnectedUsers
            users={this.state.users}
          ></ConnectedUsers>
          <ChatEvents
            history={this.props.history}
            users={this.state.users}
            user={this.state.user}
          ></ChatEvents>
          <NewMessage></NewMessage>
        </Grid>
        <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
      </Grid>
    );
  }
}

export default Chat

