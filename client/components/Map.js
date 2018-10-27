import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchInitialData, setStyle, setMap} from '../store/index'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Immutable from 'immutable'

// import { setStyle } from '../store/index';
// import 'mapbox-gl/dist/mapbox-gl.css'
// import ReactMapboxGl, {Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl'

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
      const {redLineTrains, blueLineTrains, setStyle, setMap} = this.props

      // ADD MAP SOURCES
      this.map.addSource('cta-lines', {
        type: 'geojson',
        data: geojsonCtaLines
      })
      this.map.addSource('cta-stations', {
        type: 'geojson',
        data: geojsonCtaStations
      })
      this.map.addSource('cta-redLine-trains', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: redLineTrains.map(train => {
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
      this.map.addSource('cta-blueLine-trains', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: blueLineTrains.map(train => {
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
      this.map.addLayer({
        id: 'cta-redline-trains',
        type: 'circle',
        source: 'cta-redLine-trains',
        paint: {
          'circle-radius': 3,
          'circle-color': '#c60c30'
        },
        layout: {
          visibility: 'none'
        }
      })
      this.map.addLayer({
        id: 'cta-blueline-trains',
        type: 'circle',
        source: 'cta-blueLine-trains',
        paint: {
          'circle-radius': 3,
          'circle-color': '#00a1de'
        },
        layout: {
          visibility: 'none'
        }
      })
      this.map.on('load', () => {
        setMap(this.map)
        setStyle(this.map.getStyle())
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
      const { redLineTrains, blueLineTrains } = this.props
      this.props.map.getSource('cta-redLine-trains').setData({
        type: 'FeatureCollection',
        features: redLineTrains.map(train => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [train.lon, train.lat]
            }
          }
        })
      })
      this.props.map.getSource('cta-blueLine-trains').setData({
        type: 'FeatureCollection',
        features: blueLineTrains.map(train => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [train.lon, train.lat]
            }
          }
        })
      })
    }
    return <div id="map" style={{width: '80vw', height: '92vh'}} />
  }
}

const mapState = state => {
  return {
    redLineTrains: state.redLineTrains,
    blueLineTrains: state.blueLineTrains,
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

// const accessToken =
//   'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ'

// const Mapbox = ReactMapboxGl({
//   accessToken
// })

// class Map extends Component {
//   componentDidMount() {
//     this.props.fetchInitialData()
//   }

//   render() {
//     const { style, center, zoom, containerStyle, redLineTrains, blueLineTrains, setMap } = this.props
//     return (
//       <Mapbox
//         style={style}
//         center={center}
//         zoom={zoom}
//         containerStyle={containerStyle}
//       >
//         <GeoJSONLayer
//           data={geojsonCtaLines}
//           lineLayout={{
//             "line-cap": "round",
//         }}/>

//         <GeoJSONLayer
//           data={geojsonCtaStations}
//           circlePaint={{
//             "circle-radius": 1.5,
//             "circle-color": "#000000"
//         }}/>

//         <Layer type="circle" paint={{"circle-radius": 3, "circle-color":"#c60c30"}}>
//           {redLineTrains.map((train) => {
//             return <Feature key={train.id} coordinates={[train.lon, train.lat]}/>
//           })}
//         </Layer>
//         <Layer type="circle" paint={{"circle-radius": 3, "circle-color":"#00a1de"}}>
//           {blueLineTrains.map((train) => {
//             return <Feature key={train.id} coordinates={[train.lon, train.lat]}/>
//           })}
//         </Layer>
//       </Mapbox>
//     )
//   }
// }
