module.exports = io => {

  io.on('connection', socket => {
    console.log('SOCKET CONNECTION -----> ', socket.id, ' has made a persistent connection to the server!');
  });

};
