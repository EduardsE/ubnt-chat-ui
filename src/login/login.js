import axios from 'axios';
import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: this.state.username
      });

      this.props.history.push('/chat')
    } catch (httpError) {
      console.log(httpError);
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
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
    this.classes = props.classes;

  }

  componentDidMount = () => {
    try {
      if (this.props.history.location.state.disconnectionDueTo === 'inactivity') {
        this.setState({ open: true });
        const state = { ...this.props.history.location.state };
        delete state.disconnectionDueTo;
        this.props.history.replace({ ...this.props.history.location, state });
      }
    } catch (error) {}
  }


  handleSnackbarClose = (event, reason) => {
    this.setState({ open: false });
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Form classes={this.props.classes} history={this.props.history}/>
          <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left', }}
            open={this.state.open}
            message={<span id="message-id">Disconnected due to inactivity</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={this.classes.close}
                onClick={this.handleSnackbarClose}
              >
              <CloseIcon />
              </IconButton>
            ]}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login)
