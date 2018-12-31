// EXTERNAL IMPORTS
import io from 'socket.io-client'
const dateFormat = require('dateformat');

// INTERNAL IMPORTS
import store, {setTrainData, setSource} from './store/index.js'
const socket = io(window.location.origin)
let trainCount = 0
const trainColors = ['#c60c30', '#00a1de', '#009b3a', '#f9461c', '#62361b', '#e27ea6']


socket.on('connect', () => {
  console.log('CLIENT CONNECTION -----> I am now connected to the server!')
})

socket.on('new_data_from_server', function(newData) {
  store.dispatch(setTrainData(newData))
})

socket.on('updated_data_from_server', function(newData) {
  if (trainCount === 5) {
    store.dispatch(setTrainData(newData))
    const trainLines = Object.keys(newData)
    trainLines.forEach((trainLine, idx) => {
      const sourceName = `cta-${trainLine}-trains`
      const type = 'geojson'
      const data = {
        type: 'FeatureCollection',
        features: newData[trainLine].map(train => {
          return {
            type: 'Feature',
            properties: {
              description: `<h3 style="color:white; background-color:${trainColors[idx]}; text-align:center">${trainLine}: ${train.rn}</h3><p><b>NEXT STATION:</b> ${train.nextStaNm} </p><p><b>PREDICTED ARRIVAL:</b> ${dateFormat(train.arrT, "shortTime")}</p>`
            },
            geometry: {
              type: 'Point',
              coordinates: [train.lon, train.lat]
            }
          }
        })
      }
      store.dispatch(setSource(sourceName, {type, data}))
    })
    trainCount = 0
  } else {
    trainCount++
  }
})

export default socket
