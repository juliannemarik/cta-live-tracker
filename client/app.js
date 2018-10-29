import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
