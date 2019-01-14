import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import './new-message.scss'

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
      await axios.post(`${process.env.REACT_APP_API_URL}/chat/message`, {
        message: this.state.message
      });

      this.setState({ message: '' });
    } catch (httpError) {
      console.log(httpError);
    }
  }


  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleSubmit(event) {
    event.preventDefault();
    this.sendMessage();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
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
            // type="submit"
          >
            Send
            <Icon className={this.classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(NewMessage)
