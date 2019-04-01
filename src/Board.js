import React from "react";
import Square from "./Square";
import NeighbourHandler from "./NeighbourHandler";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: this.generateGrid({ length: 10, breadth: 10 }) };
    this.neighbourHandler = new NeighbourHandler();
    this.changeLifeZone = this.changeLifeZone.bind(this);
    this.aliveCells = [];
    this.lifeZones = {
      0: [null, null, null, 1, null, null, null, null],
      1: [null, null, 1, 1, null, null, null, null]
    };
  }

  handleClick(rowIndex, colIndex) {
    this.setState(state => {
      this.aliveCells.push([rowIndex, colIndex]);
      state.board[rowIndex][colIndex] = 1;
      return { board: state.board };
    });
  }

  render() {
    return this.state.board.map((row, rowIndex) => {
      let rowJSX = row.map((col, colIndex) => (
        <Square
          key={rowIndex + "_" + colIndex}
          handleClick={this.handleClick.bind(this, rowIndex, colIndex)}
          value={row[colIndex]}
        />
      ));
      rowJSX.push(<div key={"_" + rowIndex} />);
      return rowJSX;
    });
  }

  changeLifeZone() {
    let nextGeneration = [];
    nextGeneration = this.state.board.map(value => value.slice());

    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        nextGeneration[row][column] = this.calculateNextState(row, column);
      }
    }
    this.setState({ board: nextGeneration });
  }

  calculateNextState(rowPosition, columnPosition) {
    let aliveNeighbours = this.neighbourHandler.calculateAliveNeighbours(
      this.state.board,
      rowPosition,
      columnPosition
    );

    let cellState = this.neighbourHandler.provideCellState(
      this.state.board,
      rowPosition,
      columnPosition
    );

    if (aliveNeighbours > 3) {
      return null;
    }
    let nextState = this.lifeZones[cellState][aliveNeighbours];
    return nextState;
  }

  generateGrid({ length, breadth }) {
    let rows = new Array(breadth).fill(null);
    let grid = rows.map(x => new Array(length).fill(null));
    return grid;
  }
}

export default Board;
