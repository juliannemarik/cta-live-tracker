// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setStyle, setMap} from '../../store/index'

class Layer extends Component {
  render() {
    const {layer} = this.props
    if (this.props.map && Object.keys(this.props.style).length && !this.props.map.getLayer(layer.id)) {
      const {map} = this.props
      console.log("ADDING A LAYER")
      map.addLayer(layer)
      this.props.setStyle(map.getStyle())
      console.log("MAP STYLE ===> ", this.props.style)
      console.log("MAP STYLE FROM GETSTYLE ===> ", map.getStyle())
    }

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
    setMap: map => dispatch(setMap(map))
  }
}

export default connect(mapState, mapDispatch)(Layer)
