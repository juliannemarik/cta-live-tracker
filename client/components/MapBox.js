import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchInitialData} from '../store/index'
import ReactMapboxGl, {Layer, Feature, GeoJSONLayer} from 'react-mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken =
  'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ'
const style = 'mapbox://styles/mapbox/light-v9'

const Map = ReactMapboxGl({
  accessToken
})

const mapStyle = {
  height: '80vh',
  width: '70vw'
}

class MapBox extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    const {redLineTrains, blueLineTrains} = this.props
    return (
      <Map
        style={style}
        center={[-87.6298, 41.8781]}
        zoom={[15]}
        containerStyle={mapStyle}
      >
        <Layer type="symbol" id="marker" layout={{"icon-image": "rail-11"}}  >
        {/* <Layer type="circle"  > */}
          {redLineTrains.map((train) => {
            console.log('LONG & LAT', train.lon, train.lat)
            return <Feature key={train.id} coordinates={[train.lon, train.lat]}/>
          })}
        </Layer>
        {/* <Layer type="symbol" id="marker" layout={{'icon-image': 'marker-15'}}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer> */}
      </Map>
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

export default connect(mapState, mapDispatch)(MapBox)

// export default MapBox
