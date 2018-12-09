import io from 'socket.io-client'
import store, {setTrainData} from './store/index.js'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('CLIENT CONNECTION -----> I am now connected to the server!')
})

socket.on('new_data_from_server', function(newData) {
  store.dispatch(setTrainData(newData))
})

export default socket
