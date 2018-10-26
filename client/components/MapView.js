import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';

// MATERIAL UI IMPORTS
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  sidebar: {
    width: '15vw'
  }
});

const mapStyle = {
  height: "90vh",
  width: "80vw"
}

const MapView = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Map
      style='mapbox://styles/mapbox/light-v9'
      center = {[-87.6500, 41.8950]}
      zoom ={[10]}
      containerStyle={mapStyle}
      />
      <Sidebar width={classes.sidebar}/>
    </div>
  )
}


export default withStyles(styles)(MapView);
