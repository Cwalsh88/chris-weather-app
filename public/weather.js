import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class CardTitle extends React.Component {
  render() {
    return (
      <div className="cardTitle">
        Card Title
      </div>
    );
  }
}

class Temperature extends React.Component {
  render() {
    return (
      <div className="temperature"> 
        Temperature
      </div>
      );
  }
}

class Container extends React.Component {

  componentDidMount() {
    fetch('api.openweathermap.org/data/2.5/forecast?zip=30319,us&APPID=2ec71497636bbe75193d9958f68a8c5b&cnt=1&units=imperial')
      .then(response => response.json())
      .then(data => list = JSON.parse(data));
  }

  render() {
    return (
      <div className="box">
        <CardTitle />
        <Temperature />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);

var list = [];

//Api will get passed into the Container down here.
//Then passed down in the application as props.
