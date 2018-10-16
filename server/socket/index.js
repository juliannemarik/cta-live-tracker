const RedLineTrains = require('../db/models/redLine.model');

module.exports = io => {
  io.on('connection', socket => {
    console.log('SOCKET CONNECTION -----> ', socket.id,' has made a persistent connection to the server!')

    setInterval(async function() {
        const redLineData = await RedLineTrains.findAll();
        socket.emit('new_data_from_server', redLineData);
    }, 30000)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
