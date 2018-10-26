import React from 'react'

// MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },

  radioRoot: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },

  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class Sidebar extends React.Component {
  state = {
    trainDisplay: 'All',
    anchorEl: null,
    trainStationIdx: null
  }

  handleChange = event => {
    this.setState({trainDisplay: event.target.value})
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuItemClick = (event, index) => {
    this.setState({trainStationIdx: index, anchorEl: null})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {width, classes} = this.props
    const {trainDisplay, anchorEl, trainStationIdx} = this.state
    const stations = [
      'station 1',
      'station 2',
      'station 3',
      'station 4',
      'station 5'
    ]

    return (
      <Paper className={`${classes.root} ${width}`}>
        <Grid
          className={classes.container}
          container
          spacing={32}
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12} className={classes.radioRoot}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className="">
                CTA LINES
              </FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={trainDisplay}
                onChange={this.handleChange}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="redLine"
                  control={<Radio />}
                  label="Red Line"
                />
                <FormControlLabel
                  value="blueLine"
                  control={<Radio />}
                  label="Blue Line"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              {trainStationIdx!==null ? stations[trainStationIdx] : 'SELECT STATION'}
              <ArrowDropDown className={classes.rightIcon} />
            </Button>

            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {stations.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(Sidebar)
