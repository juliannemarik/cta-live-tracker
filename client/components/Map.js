// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {fetchInitialData, setStyle, setMap} from '../store/index'
import geojsonCtaLines from '../data/CTA_Rail_Lines.json'
import geojsonCtaStations from '../data/CTA_Rail_Stations.json'

class Map extends Component {
  async componentDidMount() {
    const {accessToken, styleName, lon, lat, zoomScale} = this.props
    mapboxgl.accessToken = accessToken

    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat],
      zoom: [zoomScale]
    })

    await this.props.fetchInitialData().then(() => {
      // ADD MAP SOURCES
      this.map.addSource('cta-lines', {
        type: 'geojson',
        data: geojsonCtaLines
      })
      this.map.addSource('cta-stations', {
        type: 'geojson',
        data: geojsonCtaStations
      })
      const trainLines = Object.keys(this.props.trains)
      trainLines.forEach(trainLine => {
        this.map.addSource(`cta-${trainLine}-trains`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this.props.trains[trainLine].map(train => {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [train.lon, train.lat]
                }
              }
            })
          }
        })
      })

      // ADD MAP LAYERS
      this.map.addLayer({
        id: 'cta-lines',
        type: 'line',
        source: 'cta-lines',
        layout: {
          'line-cap': 'round'
        }
      })
      this.map.addLayer({
        id: 'cta-stations',
        type: 'circle',
        source: 'cta-stations',
        paint: {
          'circle-radius': 1.5,
          'circle-color': '#000000'
        }
      })
      const trainColors = ['#c60c30', '#00a1de', '#009b3a']
      trainLines.forEach((trainLine, idx) => {
        this.map.addLayer({
          id: `cta-${trainLine}-trains`,
          type: 'circle',
          source: `cta-${trainLine}-trains`,
          paint: {
            'circle-radius': 3,
            'circle-color': trainColors[idx]
          },
          layout: {
            visibility: 'none'
          }
        })
      })
      this.map.on('load', () => {
        this.props.setMap(this.map)
        this.props.setStyle(this.map.getStyle())
      })
    })
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
    if (this.props.map !== null) {
      const trainLines = Object.keys(this.props.trains)
      trainLines.forEach(trainLine => {
        this.props.map.getSource(`cta-${trainLine}-trains`).setData({
          type: 'FeatureCollection',
          features: this.props.trains[trainLine].map(train => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [train.lon, train.lat]
              }
            }
          })
        })
      })
    }
    return <div id="map" style={{width: '80vw', height: '92vh'}} />
  }
}

const mapState = state => {
  return {
    trains: state.trains,
    style: state.style,
    map: state.map
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialData: () => dispatch(fetchInitialData()),
    setStyle: style => dispatch(setStyle(style)),
    setMap: map => dispatch(setMap(map))
  }
}

export default connect(mapState, mapDispatch)(Map)
