// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import createLogger from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import user from './redLine'

// const reducer = combineReducers({user})
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './redLine'

import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import axios from 'axios'

// ACTION TYPES
const GET_DATA_FROM_SERVER = 'GET_DATA_FROM_SERVER'
const GET_NEW_DATA_FROM_SERVER = 'GET_NEW_DATA_FROM_SERVER'
const SET_MAP = 'SET_MAP'

// ACTION CREATORS
export const getDataFromServer = data => ({
  type: GET_DATA_FROM_SERVER,
  data
})
export const getNewDataFromServer = data => ({
  type: GET_NEW_DATA_FROM_SERVER,
  data
})
export const setMap = map => ({
  type: SET_MAP,
  map
})

// THUNK CREATORS
export const fetchInitialData = () => async dispatch => {
  const {data: redLine} = await axios.get('/api/redLine')
  const {data: blueLine} = await axios.get('/api/blueLine')
  let data = {
    redLine,
    blueLine
  }
  const action = getDataFromServer(data)
  dispatch(action)
}

// INITIAL STATE
const initialState = {
  redLineTrains: [],
  blueLineTrains: [],
  map: {}
}

// HANDLERS
const handlers = {
  [GET_DATA_FROM_SERVER]: (state, action) => {
    return {
      ...state,
      redLineTrains: action.data.redLine,
      blueLineTrains: action.data.blueLine
    }
  },
  [GET_NEW_DATA_FROM_SERVER]: (state, action) => {
    return {
      ...state,
      redLineTrains: action.data.redLine,
      blueLineTrains: action.data.blueLine
    }
  },
  [SET_MAP]: (state, action) => {
    return {...state, map: action.map}
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  } else {
    return handlers[action.type](action, state)
  }
}

// CREATE STORE
const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware)
const store = createStore(reducer, middleware)
export default store
