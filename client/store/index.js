import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'

// ACTION TYPES
const SET_TRAIN_DATA = 'SET_TRAIN_DATA'
const SET_STYLE = 'SET_STYLE'
const SET_MAP = 'SET_MAP'
const SET_SOURCE = 'SET_SOURCE'
const SET_LAYER = 'SET_LAYER'
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
export const setSource = (sourceName, source) => ({
  type: SET_SOURCE,
  sourceName,
  source
})
export const setLayer = layer => ({
  type: SET_LAYER,
  layer
})
export const toggleTrains = option => ({
  type: TOGGLE_TRAINS,
  option
})

// THUNK CREATORS

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
  trainInfo: {
    colors: ['#c60c30', '#00a1de', '#009b3a', '#f9461c', '#62361b', '#e27ea6'],
    lines: ['redLine', 'blueLine', 'greenLine', 'orangeLine', 'brownLine', 'pinkLine']
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
  [SET_SOURCE]: (action, state) => {
    const newStyle ={...state.style}
    newStyle.sources[action.sourceName] = action.source
    return {...state, style: newStyle}
  },
  [SET_LAYER]: (action, state) => {
    const newStyle = {...state.style}
    // console.log("STYLE LAYERS", (newStyle.layers[newStyle.layers.length-1]))
    newStyle.layers[newStyle.layers.length] = action.layer
    return {...state, style: newStyle}
  },
  [TOGGLE_TRAINS]: (action, state) => {
    const newStyle = {...state.style}
    const trainLayers = state.trainInfo.lines.map(line => {
      return newStyle.layers.find(
        layer => layer.id === `cta-${line}-trains`
      )
    })
    if (action.option === 'all') {
      trainLayers.forEach(trainLayer => {
        trainLayer.layout.visibility = 'visible'
      })
    } else {
      trainLayers.forEach((trainLayer, idx) => {
        if(state.trainInfo.lines[idx] !== action.option) trainLayer.layout.visibility = 'none'
        else trainLayer.layout.visibility = 'visible'
      })
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
