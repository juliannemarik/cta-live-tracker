import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchInitialData} from '../store/index'
import ReactMapboxGl, {Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl'
import geojsonCtaLines from '../data/CTA_Rail_Lines.json';
import geojsonCtaStations from '../data/CTA_Rail_Stations.json';
import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken =
  'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ'
// const style = 'mapbox://styles/mapbox/light-v9'

const Mapbox = ReactMapboxGl({
  accessToken
})

class Map extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    const {style, center, zoom, containerStyle, redLineTrains, blueLineTrains} = this.props
    return (
      <Mapbox
        style={style}
        center={center}
        zoom={zoom}
        containerStyle={containerStyle}
      >
        <GeoJSONLayer
          data={geojsonCtaLines}
          lineLayout={{
            "line-cap": "round",
        }}/>

        <GeoJSONLayer
          data={geojsonCtaStations}
          circlePaint={{
            "circle-radius": 1.5,
            "circle-color": "#000000"
        }}/>

        {/* <Layer type="symbol" id="marker" layout={{"icon-image": "rail-11"}}  > */}
        <Layer type="circle" paint={{"circle-radius": 3, "circle-color":"#c60c30"}}>
          {redLineTrains.map((train) => {
            return <Feature key={train.id} coordinates={[train.lon, train.lat]}/>
          })}
        </Layer>
        <Layer type="circle" paint={{"circle-radius": 3, "circle-color":"#00a1de"}}>
          {blueLineTrains.map((train) => {
            return <Feature key={train.id} coordinates={[train.lon, train.lat]}/>
          })}
        </Layer>
      </Mapbox>
    )
  }
}

const mapState = state => {
  return {
    redLineTrains: state.redLineTrains,
    blueLineTrains: state.blueLineTrains
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialData: () => dispatch(fetchInitialData())
  }
}

export default connect(mapState, mapDispatch)(Map)






