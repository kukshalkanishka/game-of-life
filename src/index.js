import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "./boardStyle.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.startLife = this.startLife.bind(this);
    this.boardRef = React.createRef();
  }
  render() {
    return (
      <div className="board">
        <Board ref={this.boardRef} />
        <button onClick={this.startLife} className="start-life-btn">
          Start Life
        </button>
      </div>
    );
  }

  startLife() {
    setInterval(() => {
      {
        this.boardRef.current.changeLifeZone();
      }
    }, 100);
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
