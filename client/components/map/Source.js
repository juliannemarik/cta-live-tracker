// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

// INTERNAL IMPORTS
import {setStyle, setMap, setSource} from '../../store/index'

class Source extends Component {
  componentDidMount() {
    const {type, data, sourceName} = this.props
    this.props.setSource(sourceName, {type, data})
  }

  // componentDidUpdate() {
  //   const {data, sourceName} = this.props
  //   this.props.map.getSource(sourceName).setData(data)
  // }

  render() {
    // const {type, data, sourceName} = this.props
    // if (!this.props.map.getSource(sourceName)) {
    //   this.props.map.addSource(sourceName, {type, data})
    // } else if (this.props.map.getSource(sourceName)) {
    //   this.props.map.getSource(sourceName).setData(data)
    //   console.log("CURRENT STYLE FROM SOURCES = ", this.props.map.getStyle().sources['cta-blueLine-trains'].data.features[0].geometry.coordinates)
    // }
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
    setSource: (sourceName, source) => dispatch(setSource(sourceName, source)),
    setMap: map => dispatch(setMap(map))
  }
}

export default connect(mapState, mapDispatch)(Source)
