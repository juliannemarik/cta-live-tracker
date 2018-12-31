// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

class Popup extends Component {
  componentDidMount() {
    const popup = new mapboxgl.Popup(this.props.popup)
    this.props.map.on('mouseenter', this.props.layer, e => {
      this.props.map.getCanvas().style.cursor = 'pointer'
      const coordinates = e.features[0].geometry.coordinates.slice()
      const description = e.features[0].properties.description

      popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.props.map)
    })

    if(this.props.mouseLeave) {
      this.props.map.on('mouseleave', this.props.layer, () => {
        this.props.map.getCanvas().style.cursor = ''
        popup.remove()
      })
    }
  }

  render() {
    return <div />
  }
}

const mapState = state => {
  return {
    trains: state.trains,
    style: state.style,
    map: state.map
  }
}

export default connect(mapState)(Popup)
