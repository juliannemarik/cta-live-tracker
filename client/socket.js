import io from 'socket.io-client'
import store, {getNewDataFromServer} from './store/index.js'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('CLIENT CONNECTION -----> I am now connected to the server!')
})

socket.on('new_data_from_server', function(newData) {
  console.log('NEW DATA ----> ', newData)
  const action = getNewDataFromServer(newData)
  store.dispatch(action)
})

export default socket
