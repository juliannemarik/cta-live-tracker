// EXTERNAL IMPORTS
import React from 'react'

// INTERNAL IMPORTS
import Map from './Map'
import Sidebar from './Sidebar'
require('../../secrets')

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
      />
      <Sidebar width={classes.sidebar} />
    </div>
  )
}

export default withStyles(styles)(MapView)
