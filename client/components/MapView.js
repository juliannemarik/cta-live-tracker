import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchInitialData} from '../store/index'


class MapView extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    return (
      <div id ="tables">
        <table>
          <tbody>
            <tr>
              <th colSpan="3" style={{color:'#c60c30'}}>RED LINE</th>
            </tr>
            <tr>
              <th> Route Number </th>
              <th> Latitude </th>
              <th> Longitude </th>
            </tr>
            {this.props.redLineTrains.map((train,idx) => {
              return <tr key={idx}>
              <td>{train.rn}</td>
              <td>{train.lat}</td>
              <td>{train.lon}</td>
              </tr>
            })}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th colSpan="3" style={{color:'#00a1de'}}>BLUE LINE</th>
            </tr>
            <tr>
              <th> Route Number </th>
              <th> Latitude </th>
              <th> Longitude </th>
            </tr>
            {this.props.blueLineTrains.map((train,idx) => {
              return <tr key={idx}>
              <td>{train.rn}</td>
              <td>{train.lat}</td>
              <td>{train.lon}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapState = state => {
  return {
    redLineTrains: state.redLineTrains,
    blueLineTrains: state.blueLineTrains
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialData: () => dispatch(fetchInitialData())
  }
}

export default connect(mapState, mapDispatch)(MapView)
