// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setStyle, setMap} from '../../store/index'

class Source extends Component {
  componentDidMount() {}
  render() {
    const {type, data, sourceName} = this.props

    if (this.props.map && Object.keys(this.props.style).length && !this.props.map.getSource(sourceName)) {
      this.props.map.addSource(sourceName, {
        type,
        data
      })
      this.props.setStyle(this.props.map.getStyle())
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
