import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import './new-message.scss'
import { emitMessage } from './../../helpers/socket.helper.js';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class NewMessage extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.state = {
      message: ''
    }
  }


  async sendMessage() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat/message`, {
        message: this.state.message
      });

      await this.setState({ message: '' });
    } catch (httpError) {
      console.log(httpError);
    }
  }


  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    return (
      <div className="new-message-container">
        <TextField
          id="standard-full-width"
          value={this.state.message}
          placeholder="Type your message here"
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          className="new-message"
          onChange={this.handleInputChange('message')}
        />
        <Button
          variant="contained"
          color="primary"
          className="send-button"
          onClick={() => this.sendMessage()}
          size="small"
        >
          Send
          <Icon className={this.classes.rightIcon}>send</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessage)
