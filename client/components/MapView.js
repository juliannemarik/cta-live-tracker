import React from 'react'
import {connect} from 'react-redux'

const MapView = () => (
  <div>
    <h1>MAP VIEW HERE</h1>
  </div>
)

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(MapView)
