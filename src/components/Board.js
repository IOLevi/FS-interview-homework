import React, { Component } from 'react'
import Cell from "./Cell"
import EndGame from "./EndGame"

export default class Board extends Component {


  // initialize pawns

  blackPawns = [{x: 1, y: 0},{x: 1, y: 1},{x: 1, y: 2},{x: 1, y: 3},{x: 1, y: 4},{x: 1, y: 5},{x: 1, y: 6},{x: 1, y: 7}]
  whitePawns = [{x: 6, y: 0},{x: 6, y: 1},{x: 6, y: 2},{x: 6, y: 3},{x: 6, y: 4},{x: 6, y: 5},{x: 6, y: 6},{x: 6, y: 7}]
  attacked = false
  previousSelect = null;

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      turn: "white",
      selectedPiece: {x: 6, y: 0}
    }
    this.initBoard = this.initBoard.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  initBoard = () => {
    let data = [];

    for (let i = 0; i < this.props.height; i++) {
      data.push([])
      for (let j = 0; j < this.props.width; j++) {
        data[i][j] = { x: i, y: j, color: null };
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
      newBoard[piece.x][piece.y].color = 'white';
    }
    for (let piece of this.blackPawns) {
      newBoard[piece.x][piece.y].color = 'black';
    }
    this.setState({ board: newBoard });

  }


  componentDidMount = () => {
    this.initPawns();
  }

  attackPossible = () => {
    const white = this.state.board.map(row => row.filter(piece => piece.color === 'white'))
    const black = this.state.board.map(row => row.filter(piece => piece.color === 'black'))

    // let cx = 0
    // let cy = 0
    if (this.state.turn === 'white') {
      for (let row of white) {
        for (let p of row) {
          if ((this.state.board[p.x - 1][p.y - 1] && this.state.board[p.x - 1][p.y - 1].color === 'black') || this.state.board[p.x-1][p.y+1] && this.state.board[p.x-1][p.y+1].color === 'black' ) {
            return true

        }
      }
    }
    }

    else {
      for (let row of black) {
        for (let p of row) {
          if (this.state.board[p.x+1][p.y-1] && this.state.board[p.x+1][p.y-1].color === 'white' || this.state.board[p.x+1][p.y+1] && this.state.board[p.x+1][p.y+1].color === 'white' ) {
            return true

        }
      }
    }

    }
    return false
  }
  evaluateMoves= (x, y) => {
    const newBoard = this.state.board.slice();
    const sx = this.state.selectedPiece.x
    const sy = this.state.selectedPiece.y

    // check if attack is possible first
    if (this.attackPossible()) {
      let target = (this.state.turn === 'white' ? 'black': 'white')
      if (this.state.board[x][y].color === target && sy !== y) {
        newBoard[x][y].color = this.state.turn
        newBoard[sx][sy].color = null; //previous block reset to background color
        this.previousSelect = null;
        this.attacked = true;
        this.setState({selectedPiece: null, board: newBoard,})

        if (x === 0 || x === 7) {
          this.props.gameOver()
        }
      }
    }
    else {
      if (newBoard[x][y].color === null) {
        if ((this.state.turn === 'black' && sx === x - 1) || (this.state.turn === 'white' && sx=== x + 1) ) {
          newBoard[x][y].color = this.state.turn
          newBoard[sx][sy].color = null; //previous block reset to background color
          this.previousSelect = null;
          this.attacked = false;
          this.setState({selectedPiece: null, board: newBoard, turn: (this.state.turn === 'white' ? 'black' : 'white')})

          if (x === 0 || x === 7) {
            this.props.gameOver()
          }
        }
      }

    }

    // clicking a square that isn't the currently selected color

  }


  handleClick = (sx, sy, color) =>
  {
    // console.log("clicke", sx ,sy)

    // need to change logic for being able to capture
    
    // if the piece selected is the same color as the player whose turn it is
      // console.log('yes');
      if (this.previousPiece === null || color === this.state.turn) {
        this.setState({selectedPiece: {x: sx, y: sy}})
      }
      else if (this.state.selectedPiece !== null) {
        this.evaluateMoves(sx, sy);
      }
  }

  renderBoard = (data) => {
    return data.map(datarow => {
      return datarow.map(item => {
        return (
         
          <div key={(item.x, item.y)}>
            
            <Cell selected ={(this.state.selectedPiece && this.state.selectedPiece.x === item.x && this.state.selectedPiece.y === item.y) ? "yes": "no"} x={item.x} y={item.y} color={item.color} handleClick={() => this.handleClick(item.x, item.y, item.color)} />
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