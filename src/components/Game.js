import React, { Component } from 'react'
import Board from "./Board"
import EndGame from "./EndGame"

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 8, width: 8, endGame: false};
    this.gameOver = this.gameOver.bind(this.gameOver)
    this.gameRestart = this.gameRestart.bind(this.gameRestart)
  }

  gameOver = () => {
    this.setState({
      endGame: true,
    })
  }

  gameRestart = () => {
    this.setState({
      endGame: false,
    })
  }

  render() {
    if (this.state.endGame) {
      return <EndGame gameRestart={this.gameRestart}/>
    }
    else {
      return <Board height={this.state.height} width={this.state.width} gameOver={this.gameOver}/>}
    }
}