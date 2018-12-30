// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setSource} from '../../store/index'

class Source extends Component {
  componentDidMount() {
    const {type, data, sourceName} = this.props
    this.props.setSource(sourceName, {type, data})
  }

  render() {
    return <div />
  }
}

const mapState = state => {
  return {
    style: state.style,
    map: state.map
  }
}

const mapDispatch = dispatch => {
  return {
    setSource: (sourceName, source) => dispatch(setSource(sourceName, source))
  }
}

export default connect(mapState, mapDispatch)(Source)
