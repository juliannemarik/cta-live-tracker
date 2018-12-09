import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import axios from 'axios'

// ACTION TYPES
const SET_TRAIN_DATA = 'SET_TRAIN_DATA'
const SET_STYLE = 'SET_STYLE'
const SET_MAP = 'SET_MAP'
const TOGGLE_TRAINS = 'TOGGLE_TRAINS'

// ACTION CREATORS
export const setTrainData = data => ({
  type: SET_TRAIN_DATA,
  data
})
export const setStyle = style => ({
  type: SET_STYLE,
  style
})
export const setMap = map => ({
  type: SET_MAP,
  map
})
export const toggleTrains = option => ({
  type: TOGGLE_TRAINS,
  option
})

// THUNK CREATORS
export const fetchInitialData = () => async dispatch => {
  const {data: redLine} = await axios.get('/api/redLine')
  const {data: blueLine} = await axios.get('/api/blueLine')
  let data = {
    redLine,
    blueLine
  }
  dispatch(setTrainData(data))
}

// INITIAL STATE
const initialState = {
  redLineTrains: [],
  blueLineTrains: [],
  style: {},
  map: null
}

// HANDLERS
const handlers = {
  [SET_TRAIN_DATA]: (action, state) => {
    return {
      ...state,
      redLineTrains: action.data.redLine,
      blueLineTrains: action.data.blueLine
    }
  },
  [SET_STYLE]: (action, state) => {
    return {...state, style: action.style}
  },
  [SET_MAP]: (action, state) => {
    return {...state, map: action.map}
  },
  [TOGGLE_TRAINS]: (action, state) => {
    const newStyle = {...state.style}
    const redTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-redline-trains'
    )
    const blueTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-blueline-trains'
    )

    if (action.option === 'all') {
      redTrainLayer.layout.visibility = 'visible'
      blueTrainLayer.layout.visibility = 'visible'
    } else if (action.option === 'blueLine') {
      redTrainLayer.layout.visibility = 'none'
      blueTrainLayer.layout.visibility = 'visible'
    } else if (action.option === 'redLine') {
      redTrainLayer.layout.visibility = 'visible'
      blueTrainLayer.layout.visibility = 'none'
    }
    return {...state, style: newStyle}
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
