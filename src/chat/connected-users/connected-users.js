import React from "react";

import './connected-users.scss';

class ConnectedUsers extends React.Component {
  render() {
    if (this.props.users) {
      return (
        <div className="connected-users">{
          this.props.users.map((data, index) => {
            return <User user={data} key={data.username} ></User>
          })
        }</div>
      );
    } else {
      return <div></div>
    }
  }
}

class User extends React.Component {
  render() {
    return (
      <div className="user">
        <div className="circle" style={{ background: this.props.user.color}}>
          <span>
            {this.props.user.username[0]}
          </span>
        </div>
        <span className="username">
          {this.props.user.username}
        </span>
      </div>
    );
  }
}

export default ConnectedUsers

