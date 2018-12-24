// EXTERNAL IMPORTS
import React from 'react'
import {connect} from 'react-redux'

// INTERNAL IMPORTS
import {Map, Source, Layer, Sidebar} from './index'
require('../../secrets')

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import geojsonCtaLines from '../data/CTA_Rail_Lines.json'
import geojsonCtaStations from '../data/CTA_Rail_Stations.json'

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  sidebar: {
    width: '15vw'
  }
})

const MapView = props => {
  const {classes} = props
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN
  const styleName = 'mapbox/light-v9'
  const lon = -87.65
  const lat = 41.895
  const zoomScale = 10

  return (
    <div className={classes.root}>
      <Map
        accessToken={accessToken}
        styleName={styleName}
        lon={lon}
        lat={lat}
        zoomScale={zoomScale}
      >
        <Source sourceName="cta-lines" type="geojson" data={geojsonCtaLines} />
        <Source
          sourceName="cta-stations"
          type="geojson"
          data={geojsonCtaStations}
        />

        <Layer
          layer={{
            id: 'cta-lines',
            type: 'line',
            source: 'cta-lines',
            layout: {
              'line-cap': 'round'
            }
          }}
        />
        <Layer
          layer={{
            id: 'cta-stations',
            type: 'circle',
            source: 'cta-stations',
            paint: {
              'circle-radius': 1.5,
              'circle-color': '#000000'
            }
          }}
        />
      </Map>
      <Sidebar width={classes.sidebar} />
    </div>
  )
}

const mapState = state => {
  return {
    style: state.style,
    map: state.map
  }
}

export default withStyles(styles)(connect(mapState)(MapView))
