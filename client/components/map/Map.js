// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setStyle, setMap} from '../../store/index'

class Map extends Component {
  componentDidMount() {
    const {accessToken, styleName, lon, lat, zoomScale} = this.props
    mapboxgl.accessToken = accessToken

    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat],
      zoom: [zoomScale]
    })
    this.props.setMap(this.map)
    if (!this.map.isStyleLoaded()) {
      setTimeout(() => {
        this.props.setStyle(this.map.getStyle())
      }, 2000)
    }
  }

  componentDidUpdate(prevProps) {
    const currentStyle = this.props.style
    const previousStyle = prevProps.style
    if (this.props.style === null) return
    if (!Immutable.is(previousStyle, currentStyle)) {
      this.map.setStyle(currentStyle)
    }
  }

  render() {
    return (
      <div id="map" style={{width: '80vw', height: '92vh'}}>
        {this.props.children}
      </div>
    )
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

export default connect(mapState, mapDispatch)(Map)
