import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import { Map, Schedules, MapView } from './components'

// ROUTES COMPONENT
class Routes extends Component {
  componentDidMount() {
    // this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route exact path = "/" component={MapView} />,
        <Route exact path="/map" component={MapView} />,
        <Route exact path="/schedules" component={Schedules} />
      </Switch>
    )
  }
}

// CONTAINER
const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

