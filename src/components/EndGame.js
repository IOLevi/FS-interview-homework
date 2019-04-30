import React, { Component } from 'react'

export default class EndGame extends Component {
  render() {
    return (
      <div>
        Winner!!
        <button className="button" onClick={this.props.gameRestart}>Restart</button>
      </div>
    )
  }
}