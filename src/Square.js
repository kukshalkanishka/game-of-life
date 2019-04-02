import React from "react";
import "./cellStyle.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <button
        onClick={this.props.handleClick}
        className={this.props.className}
        id={this.props.id}
      />
    );
  }
}

export default Square;
