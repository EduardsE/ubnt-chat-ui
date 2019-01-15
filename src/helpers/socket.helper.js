import openSocket from 'socket.io-client';

let socket;

function connect(cb) {
  socket = openSocket(process.env.REACT_APP_SOCKET_URL);

  socket.on('new-message', (data) => {
    cb({...data, event: 'new-message'});
  })
  socket.on('user-connected', (data) => {
    cb({ ...data, event: 'user-connected' });
  })
  socket.on('user-disconnected', (data) => {
    cb({ ...data, event: 'user-disconnected' });
  })
  socket.on('disconnect-due-to-inactivity', (data) => {
    cb({ ...data, event: 'disconnect-due-to-inactivity' });
  })
  socket.on('accessing-without-auth', (data) => {
    cb({ event: 'accessing-without-auth' });
  })
}

function close() {
  socket.disconnect();
}


export { connect, close }
