import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";


function Square(props) {
  return (
    <div class="box">
      {props.day}
      <div class="innerBox">
        Temperature
        <ul>
          <li>12pm</li>
          <li>1pm</li>
          <li>2pm</li>
          <li>3pm</li>
          <li>4pm</li>
        </ul>
      </div>
    </div>
  );
}

class APIData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items}
        </div>
      );
    }
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSquare(i) {
    return <Square day={i} />;
  }

  render() {
    return(
      <div>
        <div className="boxContainer">
          {this.renderSquare("Monday")}
          {this.renderSquare("Tuesday")}
          {this.renderSquare("Wednesday")}
          {this.renderSquare("Thursday")}
          {this.renderSquare("Friday")}
        </div>
        <APIData />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
