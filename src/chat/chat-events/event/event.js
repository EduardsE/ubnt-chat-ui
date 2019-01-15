import React from 'react';
import Moment from 'react-moment';

import './event.scss'

class Event extends React.Component {
  getFormattedTime(time) {
    return (
      <Moment format="HH:MM">
        {time}
      </Moment>
    )
  }

  render() {
    const item = this.props.event;
    let message;

    // Three cases: connected (1), disconnected by himself (2),
    // inactivity disconnect(3);
    if (item.event === 'user-connected') {
      message = `${item.username} joined`

    } else if (item.event === 'user-disconnected') {
      message = `${item.username} left the chat, connection lost`

      if (item.dueToInactivity) {
        message = `${item.username} was disconnected due to inactivity`;
      }
    } else {
      return ``;
    }

    return (
      <div className="event-container">
        <div className="event">{message} at &nbsp;
          {this.getFormattedTime(item.connectedAt)}
        </div>
      </div>
    );
  }
}

export default Event
