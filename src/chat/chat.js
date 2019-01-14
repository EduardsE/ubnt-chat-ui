import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import NewMessage from './new-message/new-message.js'
import ChatEvents from './chat-events/chat-events.js'

import './chat.scss'


class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
  }


  async componentDidMount() {
    const status = await axios.get(`${process.env.REACT_APP_API_URL}/chat/status`);
    // TODO, get active users;
  }

  render() {
    return (
      <Grid container className="container" spacing={24}>
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
        <Grid className="middle" item xs={10} sm={8} md={6} lg={4}>
          <ChatEvents history={this.props.history}></ChatEvents>
          <NewMessage></NewMessage>
        </Grid>
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
      </Grid>
    );
  }
}

export default Chat

