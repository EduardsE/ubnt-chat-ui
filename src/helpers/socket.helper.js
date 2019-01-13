import openSocket from 'socket.io-client';

let socket;

function connect(cb) {
  socket = openSocket(process.env.REACT_APP_SOCKET_URL);
  socket.on('new-message', (message) => {
    cb({
      ...message,
      event: 'new-message',
    });
  })
  socket.on('user-joined', (data) => {
    cb({
      ...data,
      event: 'user-joined',
    });
  })
}

function closeSocket() {
  socket.disconnect();
}


export { connect, closeSocket }
