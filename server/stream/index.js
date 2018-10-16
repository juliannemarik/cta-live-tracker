const {db, RedLine} = require('../db/index.js')
// const print = require('node-print');
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node')
const jsonPatch = require('fast-json-patch')

// STREAMING THE CTA API
db.sync({force: true}).then(() => console.log('Database is synced'))

module.exports = () => {
  const targetUrl =
    'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=617671a8d9104a95a0bde1954211c533&rt=red&outputType=JSON'
  const appToken = 'MmE0YTc3MmYtZDY4NS00MTI5LWExMjctNzJjZWJmOGMzNmRk'

  eventSource = streamdataio.createEventSource(targetUrl, appToken, [])
  let result = []
  let redLineTrains = []

  eventSource
    .onOpen(function() {
      console.log('DATA CONNECTION -----> connected to streaming cta data!')
    })
    .onData(function(data) {
      result = data
      redLineTrains = data.ctatt.route[0].train
      redLineTrains.map(train => {
        RedLine.create(train)
      })
    })
    .onPatch(function(patch) {
      jsonPatch.applyPatch(result, patch)
      RedLine.destroy({
        where: {},
        truncate: true
      })
      redLineTrains = result.ctatt.route[0].train
      redLineTrains.map(train => {
        RedLine.create(train)
      })
      console.log('\nDATA UPDATE -----> cta data has been updated!\n')
    })
    .onError(function(error) {
      console.log('ERROR!', error)
      eventSource.close()
    })

  eventSource.open()
}
