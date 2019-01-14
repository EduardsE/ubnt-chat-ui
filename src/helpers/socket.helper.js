import openSocket from 'socket.io-client';

let socket;

function connect(cb) {
  socket = openSocket(process.env.REACT_APP_SOCKET_URL);

  socket.on('disconnect', () => {
    cb({
      event: 'this-user-disconnected',
    });
  });

  socket.on('new-message', (message) => {
    cb({
      ...message,
      event: 'new-message',
    });
  })
  socket.on('user-connected', (data) => {
    cb({
      ...data,
      event: 'user-connected',
    });
  })
  socket.on('user-disconnected', (data) => {
    cb({
      ...data,
      event: 'user-disconnected',
    });
  })
}

function close() {
  socket.disconnect();
}


export { connect, close }
