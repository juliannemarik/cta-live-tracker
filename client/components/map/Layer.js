// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setStyle, setMap, setLayer} from '../../store/index'

class Layer extends Component {
  // componentDidMount() {
  //   const {layer} = this.props
  //   if (!this.props.map.getLayer(layer.id)) {
  //     const {map} = this.props
  //     map.addLayer(layer)
  //     this.props.setStyle(map.getStyle())
  //   }
  // }
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
    setStyle: style => dispatch(setStyle(style)),
    setLayer: layer => dispatch(setLayer(layer)),
    setMap: map => dispatch(setMap(map))
  }
}

export default connect(mapState, mapDispatch)(Layer)
