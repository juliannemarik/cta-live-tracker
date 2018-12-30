const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node')
const jsonPatch = require('fast-json-patch')
require('../../secrets')

let trainData = {
  redLine: [],
  blueLine: [],
  greenLine: [],
  orangeLine: [],
  brownLine: [],
  pinkLine: []
}

module.exports = io => {
  io.on('connection', socket => {
    console.log('SOCKET CONNECTION -----> ', socket.id, ' has made a persistent connection to the server!')
    const trainColors = ['red', 'blue', 'G', 'Org', 'Brn', 'pink']
    const trainLines = ['redLine', 'blueLine', 'greenLine', 'orangeLine', 'brownLine', 'pinkLine']

    const ctaKey = process.env.CTA_KEY
    const targetUrls = trainColors.map(color => {
      return `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=${color}&outputType=JSON`
    })

    const appToken = process.env.STREAMDATA_IO_ACCESS_TOKEN

    const eventSources = targetUrls.map(target => {
      return streamdataio.createEventSource(target, appToken, [])
    })

    const createEventSource = (eventSource, idx) => {
      let result = []
      let trains = []
      eventSource
        .onOpen(function() {
          console.log(
            `${trainColors[
              idx
            ].toUpperCase()} LINE DATA CONNECTION -----> connected to streaming cta data!`
          )
        })
        .onData(function(data) {
          result = data
          trains = data.ctatt.route[0].train
          trainData[trainLines[idx]] = trains
          socket.emit('new_data_from_server', trainData)
        })
        .onPatch(function(patch) {
          jsonPatch.applyPatch(result, patch)
          trains = result.ctatt.route[0].train
          trainData[trainLines[idx]] = trains
          socket.emit('new_data_from_server', trainData)
          console.log(
            `\n${trainColors[
              idx
            ].toUpperCase()} LINE DATA UPDATE -----> cta data has been updated!\n`
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
