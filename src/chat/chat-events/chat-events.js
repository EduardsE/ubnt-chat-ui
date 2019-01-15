import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
      case 'disconnect-due-to-inactivity':
        this.processThisUserDisconnected('inactivity');
        break;
      case 'accessing-without-auth':
        this.processThisUserDisconnected('no-auth');
        break;
      default:
        return;
    }
  }


  processNewMessage(data) {
    const messages = this.state.messages.slice();

    // Check if message has not already been received
    if (messages.find(message => message.id === data.id)) {
      return;
    }

    messages.push({ ...data, isMessage: true });
    this.setState({ messages });

    // Scroll chat to bottom
    this.chatEventsScrollerRef.scrollIntoView({ block: "end" });
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
    const messages = this.state.messages.slice();

    // Check if message has not already been received
    if (messages.find(message => message.id === data.id)) {
      return;
    }

    messages.push({ ...data, isEvent: true });
    this.setState({ messages });
  }


  processThisUserDisconnected(reason) {
    this.props.history.push('/', {
      disconnectionDueTo: reason
    });
  }


  render() {
    return (
      <div className="chat-events">
        <Messages
          messages={this.state.messages}
          user={this.props.user}
        ></Messages>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.chatEventsScrollerRef = el; }}></div>
      </div>
    );
  }
}


class Messages extends React.Component {

  getFormattedTime(time) {
    return <Moment format="HH:MM">
      {time}
    </Moment>
  }

  render() {
    const user = this.props.user;

    if (this.props.messages.length === 0) {
      return <p className="empty-messages">Messages will appear here</p>
    }

    return (
      this.props.messages.map((data, index) => {
        if (data.isMessage) {
          return (
            <div
              className={'message-container ' + (user.username === data.username ? 'my-message' : '')}
              key={data.id}
            >
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
            eventMessage = <div className="event">{data.username} joined at&nbsp;
              {this.getFormattedTime(data.connectedAt)}
            </div>
          } else if (data.event === 'user-disconnected') {
            let message = `${data.username} left the chat, connection lost`
            if (data.dueToInactivity) {
              message = `${data.username} was disconnected due to inactivity`;
            }

            eventMessage = <div className="event">{message} at &nbsp;
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

        return '';
      })
    )
  }
}

export default withStyles(styles)(ChatEvents)
