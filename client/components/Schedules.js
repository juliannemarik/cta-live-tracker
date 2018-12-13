// EXTERNAL IMPORTS
import React, {Component} from 'react'
import {connect} from 'react-redux'

class Schedules extends Component {
  render() {
    const trainLines = Object.keys(this.props.trains)
    return (
      <div id="tables">
        {trainLines.map((trainLine, idx) => {
          console.log('TRAIN LINE', trainLine)
          return (
            <table key={idx}>
              <tbody>
                <tr>
                  <th colSpan="3" style={{color: this.props.trainColors[idx]}}>
                    {trainLine}
                  </th>
                </tr>
                <tr>
                  <th> Route Number </th>
                  <th> Latitude </th>
                  <th> Longitude </th>
                </tr>
                {this.props.trains[trainLine].map((train, idx) => {
                  console.log("TRAIN ===>", train.rn, train.lat, train.lon)
                  return (
                    <tr key={idx}>
                      <td>{train.rn}</td>
                      <td>{train.lat}</td>
                      <td>{train.lon}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    trains: state.trains,
    trainColors: state.trainInfo.colors,
  }
}

export default connect(mapState)(Schedules)
