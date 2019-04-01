class NeighbourHandler {
  fetchNeighbours(rowPosition, columnPosition) {
    let points = [-1, 0, 1];
    let neighbours = [];

    points.forEach(x => {
      points.forEach(y => {
        neighbours.push([rowPosition + x, columnPosition + y]);
      });
    });

    return neighbours.filter(neighbour => {
      return !(neighbour[0] == rowPosition && neighbour[1] == columnPosition);
    });
  }

  fetchNeighboursState(board, rowPosition, columnPosition) {
    return this.fetchNeighbours(rowPosition, columnPosition).map(
      neighbourCell =>
        this.provideCellState(board, neighbourCell[0], neighbourCell[1])
    );
  }

  provideCellState(board, rowPosition, columnPosition) {
    if (this.isCellValid(board, { rowPosition, columnPosition })) {
      return board[rowPosition][columnPosition];
    }
    return 0;
  }

  isCellValid(board, { rowPosition, columnPosition }) {
    console.log(board);
    return (
      board[rowPosition] != undefined &&
      board[rowPosition][columnPosition] != undefined
    );
  }

  calculateAliveNeighbours(board, rowPosition, columnPosition) {
    let neighbourStates = this.fetchNeighboursState(
      board,
      rowPosition,
      columnPosition
    );
    return neighbourStates.reduce((state1, state2) => state1 + state2);
  }
}

export default NeighbourHandler;
