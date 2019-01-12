import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import './chat.scss'

class Chat extends React.Component {
  render() {
    return (
      <Grid container className="container" spacing={24}>
        <Grid item xs={1} sm={2} md={3}></Grid>
        <Grid className="middle" item xs={10} sm={8} md={6}>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Type your message here"
            fullWidth
            margin="none"
            InputLabelProps={{
              shrink: true,
            }}
            className="new-message"
          />
        </Grid>
        <Grid item xs={1} sm={2} md={3}></Grid>
      </Grid>
    );
  }
}


export default Chat;

