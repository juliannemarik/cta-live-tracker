// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
const dateFormat = require('dateformat');

// INTERNAL IMPORTS
import {Map, Source, Layer, Popup, Sidebar} from './index'
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

class MapView extends Component {
  render() {
    const {classes, trains, trainColors} = this.props
    const trainLines = Object.keys(trains)

    return (
      <div className={classes.root}>
        <Map
          accessToken={process.env.MAPBOX_ACCESS_TOKEN}
          styleName="mapbox/light-v9"
          lon={-87.65}
          lat={41.895}
          zoomScale={10}
        >
          {/* ADD MAP SOURCES */}
          <Source
            sourceName="cta-lines"
            type="geojson"
            data={geojsonCtaLines}
          />
          <Source
            sourceName="cta-stations"
            type="geojson"
            data={geojsonCtaStations}
          />
          {trainLines.map((trainLine, idx) => {
            return (
              <Source
                key={trainLine}
                sourceName={`cta-${trainLine}-trains`}
                type="geojson"
                data={{
                  type: 'FeatureCollection',
                  features: trains[trainLine].map(train => {
                    return {
                      type: 'Feature',
                      properties: {
                        description: `<h3 style="color:white; background-color:${trainColors[idx]}; text-align:center">${trainLine}: ${train.rn}</h3><p><b>NEXT STATION:</b> ${train.nextStaNm} </p><p><b>PREDICTED ARRIVAL:</b> ${dateFormat(train.arrT, "shortTime")}</p>`
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: [train.lon, train.lat]
                      }
                    }
                  })
                }}
              />
            )
          })}

          {/* ADD MAP LAYERS */}
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
          {trainLines.map((trainLine, idx) => {
            return (
              <Layer
                key={idx}
                layer={{
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
                }}
              />
            )
          })}

          {/* ADD MAP POPUPS */}
          {trainLines.map((trainLine, idx) => {
            return (
              <Popup
                key={idx}
                popup={{ closeButton: false, closeOnClick: false }}
                mouseLeave={true}
                layer= {`cta-${trainLine}-trains`}
              />
            )
          })}

        </Map>
        <Sidebar width={classes.sidebar} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    trains: state.trains,
    trainColors: state.trainInfo.colors,
    style: state.style,
    map: state.map
  }
}

export default withStyles(styles)(connect(mapState)(MapView))
