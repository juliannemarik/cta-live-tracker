import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// COMPONENT
const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1><Link to="/">CTA LIVE TRACKER</Link></h1>
    <nav>
      <div>
        <Link to="/map">MAP</Link>
        <Link to="/schedules">SCHEDULES</Link>
        <Link to="/mapbox">MAPBOX</Link>
      </div>
    </nav>
    <hr />
  </div>
)

// CONTAINER
const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Navbar)

