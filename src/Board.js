import React from "react";
import Square from "./Square";
import NeighbourHandler from "./NeighbourHandler";
import "./cellStyle.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.length = 10;
    this.width = 10;
    this.state = {
      board: this.generateGrid({ length: this.length, breadth: this.width })
    };
    this.neighbourHandler = new NeighbourHandler();
    this.changeLifeZone = this.changeLifeZone.bind(this);
    this.aliveCells = [];
    this.lifeZones = {
      0: [null, null, null, 1, null, null, null, null],
      1: [null, null, 1, 1, null, null, null, null]
    };
  }

  handleClick(rowIndex, colIndex, event) {
    document.getElementById(event.target.id).className = "black-cell ";
    this.setState(state => {
      this.aliveCells.push([rowIndex, colIndex]);
      state.board[rowIndex][colIndex] = 1;
      return { board: state.board };
    });
  }

  renderCell(rowIndex, colIndex, cellValue) {
    let className = "cell";
    if (cellValue == 1) {
      className = "black-cell";
    }
    return (
      <Square
        key={rowIndex + "_" + colIndex}
        id={rowIndex + "_" + colIndex}
        handleClick={this.handleClick.bind(this, rowIndex, colIndex)}
        className={className}
      />
    );
  }

  render() {
    return this.state.board.map((row, rowIndex) => {
      let rowJSX = row.map((col, colIndex) =>
        this.renderCell(rowIndex, colIndex, row[colIndex])
      );
      rowJSX.push(<br key={"_" + rowIndex} />);
      return rowJSX;
    });
  }

  changeLifeZone() {
    let nextGeneration = [];
    nextGeneration = this.state.board.map(value => value.slice());

    for (let row = 0; row < this.length; row++) {
      for (let column = 0; column < this.width; column++) {
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
