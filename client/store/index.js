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
  const {data: redLine} = await axios.get('/api/line/red')
  const {data: blueLine} = await axios.get('/api/line/blue')
  const {data: greenLine} = await axios.get('/api/line/G')
  const {data: orangeLine} = await axios.get('/api/line/Org')
  const {data: brownLine} = await axios.get('/api/line/Brn')
  const {data: pinkLine} = await axios.get('/api/line/pink')

  let data = {
    redLine,
    blueLine,
    greenLine,
    orangeLine,
    brownLine,
    pinkLine
  }
  dispatch(setTrainData(data))
}

// INITIAL STATE
const initialState = {
  trains: {
    redLine: [],
    blueLine: [],
    greenLine: [],
    orangeLine: [],
    brownLine: [],
    pinkLine: []
  },
  style: {},
  map: null
}

// HANDLERS
const handlers = {
  [SET_TRAIN_DATA]: (action, state) => {
    return {
      ...state,
      trains: {
        redLine: action.data.redLine,
        blueLine: action.data.blueLine,
        greenLine: action.data.greenLine,
        orangeLine: action.data.orangeLine,
        brownLine: action.data.brownLine,
        pinkLine: action.data.pinkLine
      }
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
      layer => layer.id === 'cta-redLine-trains'
    )
    const blueTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-blueLine-trains'
    )
    const greenTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-greenLine-trains'
    )
    const orangeTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-orangeLine-trains'
    )
    const brownTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-brownLine-trains'
    )
    const pinkTrainLayer = newStyle.layers.find(
      layer => layer.id === 'cta-pinkLine-trains'
    )

    if (action.option === 'all') {
      redTrainLayer.layout.visibility = 'visible'
      blueTrainLayer.layout.visibility = 'visible'
      greenTrainLayer.layout.visibility = 'visible'
      orangeTrainLayer.layout.visibility = 'visible'
      brownTrainLayer.layout.visibility = 'visible'
      pinkTrainLayer.layout.visibility = 'visible'

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
