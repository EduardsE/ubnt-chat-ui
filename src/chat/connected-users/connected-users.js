import React from "react";

import './connected-users.scss';

class ConnectedUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  render() {
    if (this.props.users) {
      return (
        <div className="connected-users">
          {this.renderUsers()}
        </div>
      );
    } else {
      return <div></div>
    }
  }

  renderUsers(user) {
    return this.props.users.map((data, index) => {
      return <User user={data}></User>
    });
  }
}

class User extends React.Component {
  render() {
    return (
      <div className="user">
        <div key={this.props.user.id} className="circle" style={{ background: this.props.user.color}}>
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

