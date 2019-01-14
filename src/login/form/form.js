import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Form extends Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.state = {
      username: ''
    }
  }

  async connect() {
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: this.state.username
      }).then(data => {
        this.props.history.push('/chat')
      });
    } catch (httpError) {
      console.log(httpError);
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.connect();
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          id="username"
          label="Username"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={this.handleChange('username')}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.connect.bind(this)}
        >
          Connect
          <Icon className={this.classes.rightIcon}>send</Icon>
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Form)
