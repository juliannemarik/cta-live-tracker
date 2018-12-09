import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Schedules, MapView} from './components'

// ROUTES COMPONENT
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MapView} />,
        <Route exact path="/map" component={MapView} />,
        <Route exact path="/schedules" component={Schedules} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
