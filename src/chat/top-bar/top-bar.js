import axios from 'axios';
import React from "react";

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import * as Socket from './../../helpers/socket.helper.js';
import './top-bar.scss';

class TopBar extends React.Component {
  async disconnect() {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
    Socket.close();
    this.props.history.push('/')
  }


  render() {
    return (
      <div className="topbar">
        <p>Online</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.disconnect()}
          size="small"
        >
          Disconnect
          <Icon>close</Icon>
        </Button>
      </div>
    );
  }
}

export default TopBar

