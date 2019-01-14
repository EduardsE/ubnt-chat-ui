import React from "react";

import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import Form from './form/form.js';
import './login.scss'

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

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
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Form classes={this.props.classes} history={this.props.history}/>
          <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
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
        <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login)
