import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import React from 'react';

import './chat-events.scss'
import { connect, closeSocket } from './../../helpers/socket.helper.js';


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

    connect(message => {
      console.log(message);
    });
  }


  async disconnect() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
    } catch (httpError) {
      console.log(httpError);
    }

    closeSocket();
    this.props.history.push('/')
  }


  render() {
    return (
      <div className="chat-events">
        <Button
          variant="contained"
          color="primary"
          className="send-button"
          onClick={() => this.disconnect()}
          size="small"
        >
          Disconnect
          <Icon className={this.classes.rightIcon}>send</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ChatEvents)
