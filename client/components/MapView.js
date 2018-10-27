import React from 'react'
import Map from './Map'
import Sidebar from './Sidebar'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'

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
  const accessToken =
    'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ'
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
      />
      <Sidebar width={classes.sidebar} />
    </div>
  )
}

export default withStyles(styles)(MapView)
