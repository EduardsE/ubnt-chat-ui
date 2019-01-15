import React from 'react';

import './message.scss';

class Message extends React.Component {
  render() {
    const message = this.props.message;
    const user = this.props.user;

    return (
      <div
        className={
          'message-container ' +
          (user.username === message.username ? 'my-message' : '')
        }
      >
        <div className="circle" style={{ background: user.color}}>
          <span>
            {message.username[0]}
          </span>
        </div>
        <div className="bubble">
          <p className="username">{message.username}</p>
          <div className="message"> {message.message}</div>
        </div>
      </div>
    );
  }
}

export default Message;
