import io from 'socket.io-client'
import store, {setTrainData} from './store/index.js'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('CLIENT CONNECTION -----> I am now connected to the server!')
})

let trainCount = 0
socket.on('new_data_from_server', function(newData) {
  if(trainCount === 5) {
    store.dispatch(setTrainData(newData))
    trainCount = 0
  } else {
    trainCount ++
  }
})

export default socket
