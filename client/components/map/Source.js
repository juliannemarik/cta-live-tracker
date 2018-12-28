// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setStyle, setMap} from '../../store/index'

class Source extends Component {
  render() {
    const {type, data, sourceName} = this.props
    if (!this.props.map.getSource(sourceName)) {
      this.props.map.addSource(sourceName, {type, data})
    } else if (this.props.map.getSource(sourceName)) {
      this.props.map.getSource(sourceName).setData(data)
    }
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
    setStyle: style => dispatch(setStyle(style)),
    setMap: map => dispatch(setMap(map))
  }
}

export default connect(mapState, mapDispatch)(Source)
