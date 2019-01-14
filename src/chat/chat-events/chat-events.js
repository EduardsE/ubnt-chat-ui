import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Moment from 'react-moment';
import React from 'react';

import './chat-events.scss'
import * as Socket from './../../helpers/socket.helper.js';


const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class ChatEvents extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.state = {
      messages: []
    }

    Socket.connect(data => {
      this.processIncomingEvent(data);
    });
  }


  processIncomingEvent(data) {
    const event = data['event'];

    switch(event) {
      case 'new-message':
        delete data['event'];
        this.processNewMessage(data);
        break;
      case 'user-connected':
        this.processUserConnected(data);
        break;
      case 'user-disconnected':
        this.processUserDisconnected(data);
        break;
      case 'this-user-disconnected':
        this.processThisUserDisconnected(data);
        break;
      default:
        return;
    }
  }


  async disconnect() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
    } catch (httpError) {
      console.log(httpError);
    }

    Socket.close();
    this.props.history.push('/')
  }


  processNewMessage(data) {
    const messages = this.state.messages.slice();

    // Check if message has not already been received
    if (messages.find(message => message.id === data.id)) {
      return;
    }

    messages.push({ ...data, isMessage: true });
    this.setState({ messages });
  }


  processUserConnected(data) {
    const messages = this.state.messages.slice();

    // Check if message has not already been received
    if (messages.find(message => message.id === data.id)) {
      return;
    }

    messages.push({ ...data, isEvent: true });
    this.setState({ messages });
  }


  processUserDisconnected(data) {
    const user = data.user;
    const messages = this.state.messages.slice();

    // Check if message has not already been received
    if (messages.find(message => message.id === data.id)) {
      return;
    }

    messages.push({ ...data, isEvent: true });
    this.setState({ messages });
  }


  processThisUserDisconnected() {
    this.props.history.push('/', {
      disconnectionDueTo: 'inactivity'
    });
  }


  render() {
    return (
      <div className="chat-events">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.disconnect()}
          size="small"
        >
          Disconnect
          <Icon className={this.classes.rightIcon}>send</Icon>
        </Button>
        <div>
          <Messages messages={this.state.messages}></Messages>
        </div>
      </div>
    );
  }
}


class Messages extends React.Component {

  getFormattedTime(time) {
    return <Moment format="dddd HH:MM">
      {time}
    </Moment>
  }

  render() {
    return (
      this.props.messages.map((data, index) => {
        if (data.isMessage) {
          return (
            <div className="message-container" key={data.id}>
              <div className="circle" style={{ background: data.color}}>
                <span>
                  {data.username[0]}
                </span>
              </div>
              <div className="bubble">
                <p className="username">{data.username}</p>
                <div className="message"> {data.message}</div>
              </div>
            </div>
          );
        } else if (data.isEvent) {
          let eventMessage;
          if (data.event === 'user-connected') {
            eventMessage = <div className="event">{data.username} joined at &nbsp;
              {this.getFormattedTime(data.connectedAt)}
            </div>
          } else if (data.event === 'user-disconnected') {
            let messageContext = 'disconnected';
            if (data.dueToInactivity) {
              messageContext = 'disconnected due to inactivity';
            }

            eventMessage = <div className="event">{data.username} {messageContext} at &nbsp;
              {this.getFormattedTime(data.connectedAt)}
            </div>
          } else {
            return ``;
          }

          return (
            <div className="event-container" key={data.id}>
              {eventMessage}
            </div>
          );
        }
      })
    )
  }
}

export default withStyles(styles)(ChatEvents)
