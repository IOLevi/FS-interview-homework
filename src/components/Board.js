import React, { Component } from 'react'
import Cell from "./Cell"
import EndGame from "./EndGame"

export default class Board extends Component {


  // initialize pawns

  whitePawns = [{x: 1, y: 0},{x: 1, y: 1},{x: 1, y: 2},{x: 1, y: 3},{x: 1, y: 4},{x: 1, y: 5},{x: 1, y: 6},{x: 1, y: 7}]
  blackPawns = [{x: 6, y: 0},{x: 6, y: 1},{x: 6, y: 2},{x: 6, y: 3},{x: 6, y: 4},{x: 6, y: 5},{x: 6, y: 6},{x: 6, y: 7}]

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      turn: "white"
    }
    this.initBoard = this.initBoard.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
  }

  initBoard = () => {
    let data = [];

    for (let i = 0; i < this.props.height; i++) {
      data.push([])
      for (let j = 0; j < this.props.width; j++) {
        data[i][j] = { x: i, y: j, white: false, black: false };
      }

    }
    return data;
  }

  renderPawns = () => {
    const newBoard = this.state.board.slice();
  }

  initPawns = () => {
    const newBoard = this.state.board.slice();

    for (let piece of this.whitePawns) {
      newBoard[piece.x][piece.y].white = true;
    }
    for (let piece of this.blackPawns) {
      newBoard[piece.x][piece.y].black = true;
    }
    this.setState({ board: newBoard });

  }


  componentDidMount = () => {
    this.initPawns();
  }

  renderBoard = (data) => {
    return data.map(datarow => {
      return datarow.map(item => {
        return (
         
          <div key={(item.x, item.y)}>

            <Cell x={item.x} y={item.y} white={item.white} black={item.black} />
            {(datarow[datarow.length - 1] === item) ? <div className="clear" /> : ""}
          </div>
        )
      })
    })
  }


  render() {
    return (<div>{this.state.turn + "'s turn"}{this.renderBoard(this.state.board)}</div>)
  }
}