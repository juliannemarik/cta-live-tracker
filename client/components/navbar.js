// EXTERNAL IMPORTS
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// MATERIAL UI IMPORTS
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontWeight: 300,
    letterSpacing: theme.spacing.unit * 1 / 4,
    flexGrow: 1
  },
  homeButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    color: 'inherit',
  },
  navText: {
    color: 'inherit',
    fontWeight: 300,
    letterSpacing: theme.spacing.unit * 1 / 4
  }
})

const Navbar = props => {
  const {classes} = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            CTA LIVE TRACKER
          </Typography>
          <Link to="/schedules" className={classes.link}>
            <Button color="inherit"><Typography className={classes.navText}>Schedules</Typography></Button>
          </Link>
          <Link to="/map" className={classes.link}>
            <Button color="inherit"><Typography className={classes.navText}>Map</Typography></Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
