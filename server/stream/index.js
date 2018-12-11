const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node')
const jsonPatch = require('fast-json-patch')
require('../../secrets')

// STREAMING THE CTA API
module.exports = io => {
  io.on('connection', socket => {
    console.log(
      'SOCKET CONNECTION -----> ',
      socket.id,
      ' has made a persistent connection to the server!'
    )

    const trainLines = ['red', 'blue']
    const trainColors = ['redLine', 'blueLine']

    let trainData = {
      redLine: [],
      blueLine: []
    }

    const ctaKey = process.env.CTA_KEY
    const targetUrls = trainLines.map(color => {
      return `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=${color}&outputType=JSON`
    })
    // const redLinetargetUrl = `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=red&outputType=JSON`
    // const blueLineTargetUrl = `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=blue&outputType=JSON`

    const appToken = process.env.STREAMDATA_IO_ACCESS_TOKEN

    const eventSources = targetUrls.map(target => {
      return streamdataio.createEventSource(target, appToken, [])
    })

    const createEventSource = (eventSource, idx) => {
      console.log('IN CREATE EVENT SOURCE')
      let result = []
      let trains = []
      eventSource
        .onOpen(function() {
          console.log(`${trainLines[idx].toUpperCase()} LINE DATA CONNECTION -----> connected to streaming cta data!`)
        })
        .onData(function(data) {
          result = data
          trains = data.ctatt.route[0].train
          trainData[trainColors[idx]] = trains
          socket.emit('new_data_from_server', trainData)
        })
        .onPatch(function(patch) {
          jsonPatch.applyPatch(result, patch)
          trains = result.ctatt.route[0].train
          trainData[trainColors[idx]] = trains
          socket.emit('new_data_from_server', trainData)
          console.log(
            `\n${trainLines[idx].toUpperCase()} LINE DATA UPDATE -----> cta data has been updated!\n`
          )
        })
        .onError(function(error) {
          console.log('ERROR!', error)
          eventSource.close()
        })
    }

    eventSources.forEach((eventSource, idx) => {
      createEventSource(eventSource, idx)
      eventSource.open()
    })
  })
}

// module.exports = io => {
//   io.on('connection', socket => {
//     console.log(
//       'SOCKET CONNECTION -----> ',
//       socket.id,
//       ' has made a persistent connection to the server!'
//     )
//     const ctaKey = process.env.CTA_KEY
//     const redLinetargetUrl = `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=red&outputType=JSON`
//     const blueLineTargetUrl = `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=blue&outputType=JSON`

//     const appToken = process.env.STREAMDATA_IO_ACCESS_TOKEN

//     redLineEventSource = streamdataio.createEventSource(
//       redLinetargetUrl,
//       appToken,
//       []
//     )
//     blueLineEventSource = streamdataio.createEventSource(
//       blueLineTargetUrl,
//       appToken,
//       []
//     )

//     let redLineResult = [], redLineTrains = []
//     let blueLineResult = [], blueLineTrains = []
//     let trainData = {
//       redLine: [],
//       blueLine: []
//     }

//     redLineEventSource
//       .onOpen(function() {
//         console.log(
//           'RED LINE DATA CONNECTION -----> connected to streaming cta data!'
//         )
//       })
//       .onData(function(data) {
//         redLineResult = data
//         redLineTrains = data.ctatt.route[0].train
//         trainData.redLine = redLineTrains
//         socket.emit('new_data_from_server', trainData)
//       })
//       .onPatch(function(patch) {
//         jsonPatch.applyPatch(redLineResult, patch)
//         redLineTrains = redLineResult.ctatt.route[0].train
//         trainData.redLine = redLineTrains
//         socket.emit('new_data_from_server', trainData)
//         console.log('\nRED LINE DATA UPDATE -----> cta data has been updated!\n')
//       })
//       .onError(function(error) {
//         console.log('ERROR!', error)
//         redLineEventSource.close()
//       })

//     blueLineEventSource
//       .onOpen(function() {
//         console.log(
//           'BLUE LINE DATA CONNECTION -----> connected to streaming cta data!'
//         )
//       })
//       .onData(function(data) {
//         blueLineResult = data
//         blueLineTrains = data.ctatt.route[0].train
//         trainData.blueLine = blueLineTrains
//         socket.emit('new_data_from_server', trainData)
//       })
//       .onPatch(function(patch) {
//         jsonPatch.applyPatch(blueLineResult, patch)
//         blueLineTrains = blueLineResult.ctatt.route[0].train
//         trainData.blueLine = blueLineTrains
//         socket.emit('new_data_from_server', trainData)
//         console.log('\nBLUE LINE DATA UPDATE -----> cta data has been updated!\n')
//       })
//       .onError(function(error) {
//         console.log('ERROR!', error)
//         blueLineEventSource.close()
//       })

//     redLineEventSource.open()
//     blueLineEventSource.open()

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })
//   })
// }
