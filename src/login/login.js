import React from "react";
import { compose } from 'recompose'
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Form from './form/form.js';
import './login.scss'


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
  }


  componentDidMount = () => {
    this.showSnackbarOnDisconnect();
  }


  showSnackbarOnDisconnect() {
    try {
      if (this.props.history.location.state.disconnectionDueTo) {
        let message = 'Disconnected by the server due to inactivity.';
        if (this.props.history.location.state.disconnectionDueTo === 'no-auth') {
          message = 'Accessing without authentication is not allowed';
        }

        this.props.enqueueSnackbar(message, {
          variant: 'error',
          action: <Button color="primary" size="small">Dismiss</Button>,
          autoHideDuration: 6000,
        });

        // Resetting history location state
        const state = { ...this.props.history.location.state };
        delete state.disconnectionDueTo;
        this.props.history.replace({ ...this.props.history.location, state });
      }
    } catch (error) {}
  }


  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Form
            classes={this.props.classes}
            history={this.props.history}
          />
        </Grid>
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

export default compose(
  withStyles(styles),
  withSnackbar
)(Login)
