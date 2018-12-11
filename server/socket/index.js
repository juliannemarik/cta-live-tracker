// const {RedLine, BlueLine} = require('../db/index.js')

// module.exports = io => {
//   io.on('connection', socket => {
//     console.log(
//       'SOCKET CONNECTION -----> ',
//       socket.id,
//       ' has made a persistent connection to the server!'
//     )

//     setInterval(async function() {
//       const redLine = await RedLine.findAll()
//       const blueLine = await BlueLine.findAll()
//       const newData = {
//         redLine,
//         blueLine
//       }
//       socket.emit('new_data_from_server', newData)
//     }, 30000)

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })
//   })
// }
