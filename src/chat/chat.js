import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import NewMessage from './new-message/new-message.js'
import ChatEvents from './chat-events/chat-events.js'
import ConnectedUsers from './connected-users/connected-users.js'

import './chat.scss'
import * as Socket from '../helpers/socket.helper.js';


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


  componentWillUnmount() {
    this._isMounted = false;
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


  render() {
    return (
      <Grid container className="container" spacing={24}>
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
        <Grid className="middle" item xs={10} sm={8} md={6} lg={4}>
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
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
      </Grid>
    );
  }
}

export default Chat

