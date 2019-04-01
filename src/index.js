import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.startLife = this.startLife.bind(this);
    this.boardRef = React.createRef();
  }
  render() {
    return (
      <div>
        <Board ref={this.boardRef} />
        <button onClick={this.startLife}>Start Life</button>
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
