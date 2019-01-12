import axios from 'axios';
import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import './login.scss'

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

  async handleClick() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username: this.state.username
      });

      this.props.history.push('/chat')
    } catch (httpErrpr) {
      console.log(httpErrpr);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <form noValidate autoComplete="off">
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
          onClick={this.handleClick.bind(this)}
        >
          Connect
          <Icon className={this.classes.rightIcon}>send</Icon>
        </Button>
      </form>
    );
  }
}

class Login extends React.Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Form classes={this.props.classes} history={this.props.history}/>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login)
