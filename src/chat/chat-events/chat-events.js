import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import './chat-events.scss'
import * as Socket from './../../helpers/socket.helper.js';
import Event from './event/event.js';
import Message from './message/message.js';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class ChatEvents extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.state = {
      messages: [] // Stores both messages and events (conn and disconn);
    }

    Socket.connect(data => {
      this.processIncomingEvent(data);
    });
  }


  /*
  * Processes incoming socket data
  * @param {data} message or connection change event data
  */
  processIncomingEvent(data) {
    const event = data['event'];

    switch(event) {
      case 'new-message':
        delete data['event'];
        this.processIncomingEventsAndMessages(data);
        break;
      case 'user-connected':
        this.processIncomingEventsAndMessages(data, true);
        break;
      case 'user-disconnected':
        this.processIncomingEventsAndMessages(data, true);
        break;
      case 'disconnect-due-to-inactivity':
        this.processThisUserDisconnected('inactivity');
        break;
      case 'accessing-without-auth':
        this.processThisUserDisconnected('no-auth');
        break;
      default:
        break;
    }
  }


  /*
  * Pushes incoming events and messages to stack and pushes chat down
  * @param {data} message or connection change event data
  * @param {isEvent} bool: indicated weather received a message or event
  */
  processIncomingEventsAndMessages(data, isEvent = false) {
    const messages = this.state.messages.slice();

    // Check if message has not already been received
    if (messages.find(message => message.eventId === data.eventId)) {
      return;
    }

    messages.push({ ...data, isEvent });
    this.setState({ messages });

    // Scroll chat to bottom after events
    this.chatEventsScrollerRef.scrollIntoView({ block: "end" });
  }


  /*
  * Redirects user to login incase of a disconnect
  * @param {reason} 'no-auth' | 'inactivity'
  */
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
        <div
          style={{ float:"left", clear: "both" }}
          ref={(el) => { this.chatEventsScrollerRef = el; }}
        ></div>
      </div>
    );
  }
}


class Messages extends React.Component {
  render() {
    if (this.props.messages.length === 0) {
      return <p className="empty-messages">Messages will appear here</p>
    }

    return (
      this.props.messages.map((data, index) => {
        if (data.isEvent) {
          return <Event event={data} key={data.eventId}/>
        } else {
          return <Message message={data} key={data.eventId} user={this.props.user}/>
        }
      })
    )
  }
}

export default withStyles(styles)(ChatEvents)
