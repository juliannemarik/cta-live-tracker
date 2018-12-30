// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setLayer} from '../../store/index'

class Layer extends Component {
  componentDidMount() {
    const {layer} = this.props
    this.props.setLayer(layer)
  }

  render() {
    return <div />
  }
}

const mapState = state => {
  return {
    style: state.style,
    map: state.map
  }
}

const mapDispatch = dispatch => {
  return {
    setLayer: layer => dispatch(setLayer(layer))
  }
}

export default connect(mapState, mapDispatch)(Layer)
