const {db, RedLine, BlueLine} = require('../db/index.js')
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node')
const jsonPatch = require('fast-json-patch')
var print = require('node-print')

// STREAMING THE CTA API
db.sync({force: true}).then(() => console.log('Database is synced'))

module.exports = () => {
  const redLinetargetUrl =
    'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=617671a8d9104a95a0bde1954211c533&rt=red&outputType=JSON'
  const blueLineTargetUrl =
    'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=617671a8d9104a95a0bde1954211c533&rt=blue&outputType=JSON'

  const appToken = process.env.STREAMDATA_IO_ACCESS_TOKEN

  redLineEventSource = streamdataio.createEventSource(
    redLinetargetUrl,
    appToken,
    []
  )
  blueLineEventSource = streamdataio.createEventSource(
    blueLineTargetUrl,
    appToken,
    []
  )

  let redLineResult = []
  let blueLineResult = []

  let redLineTrains = []
  let blueLineTrains = []

  redLineEventSource
    .onOpen(function() {
      console.log(
        'RED LINE DATA CONNECTION -----> connected to streaming cta data!'
      )
    })
    .onData(function(data) {
      redLineResult = data
      redLineTrains = data.ctatt.route[0].train
      redLineTrains.map(train => {
        RedLine.create(train)
      })
    })
    .onPatch(function(patch) {
      jsonPatch.applyPatch(redLineResult, patch)
      RedLine.destroy({
        where: {},
        truncate: true
      })
      redLineTrains = redLineResult.ctatt.route[0].train
      redLineTrains.map(train => {
        RedLine.create(train)
      })
      console.log('\nRED LINE DATA UPDATE -----> cta data has been updated!\n')
    })
    .onError(function(error) {
      console.log('ERROR!', error)
      redLineEventSource.close()
    })

  blueLineEventSource
    .onOpen(function() {
      console.log(
        'BLUE LINE DATA CONNECTION -----> connected to streaming cta data!'
      )
    })
    .onData(function(data) {
      blueLineResult = data
      blueLineTrains = data.ctatt.route[0].train
      blueLineTrains.map(train => {
        BlueLine.create(train)
      })
    })
    .onPatch(function(patch) {
      jsonPatch.applyPatch(blueLineResult, patch)
      BlueLine.destroy({
        where: {},
        truncate: true
      })
      blueLineTrains = blueLineResult.ctatt.route[0].train
      blueLineTrains.map(train => {
        BlueLine.create(train)
      })
      console.log('\nBLUE LINE DATA UPDATE -----> cta data has been updated!\n')
    })
    .onError(function(error) {
      console.log('ERROR!', error)
      blueLineEventSource.close()
    })

  redLineEventSource.open()
  blueLineEventSource.open()
}
