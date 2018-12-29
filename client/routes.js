import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {MapView} from './components'

// ROUTES COMPONENT
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MapView} />,
      </Switch>
    )
  }
}

export default withRouter(Routes)
