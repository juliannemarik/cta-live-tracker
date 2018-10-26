import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// MATERIAL UI IMPORTS
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  homeButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: "inherit",
  }
});

const Navbar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.homeButton}  color="inherit" aria-label="home">
            <Link to='/' className={classes.link}><HomeIcon /></Link>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            CTA LIVE TRACKER
          </Typography>
          <Link to="/schedules" className={classes.link}><Button color="inherit">Schedules</Button></Link>
          <Link to="/map" className={classes.link}><Button color="inherit">Map</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);

