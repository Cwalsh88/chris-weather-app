class Title extends React.Component {
  render() {
    return (
      <div className="title">
        Check your 5-day Forecast
      </div>
    );
  }
}

class Temperature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let temp = this.props.temp;
    return (
      <div className="temperature"> 
        {temp.main.temp}
      </div>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let temp = this.props.temp; 
    let day = this.props.day;
    return (
      <div className="card">
          {day}
          <Temperature temp={temp} />
      </div>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
   
  render() {
    console.log("Rendering");
    let temps = this.props.temps;
    return (
      <div>
          <Title />
          <Card day="Monday" temp={temps[0]}/>
          <Card day="Tuesday" temp={temps[8]}/>
          <Card day="Wednesday" temp={temps[16]}/>
          <Card day="Thursday" temp={temps[24]}/>
          <Card day="Friday" temp={temps[32]}/>
      </div>
    );
  }
}

console.log("Beginning of App, can write JS freely here");
var apiTemps = [];
fetch('https://api.openweathermap.org/data/2.5/forecast?zip=30319,us&APPID=2ec71497636bbe75193d9958f68a8c5b&cnt=40&units=imperial')
      .then(response => response.json())
      .then(data => {
      apiTemps = data.list; 
      const rootElement = document.getElementById("root");
      ReactDOM.render(<Container temps={apiTemps}  />, rootElement);
    }); 

//Then passed down in the application as props.
/*

    .filter((day,index) => index%8 == 0)

            <ul>
          {temps
           .map((day,index) =>
              <li key={day.dt}>
                {day.main.temp}
              </li>
          )}
        </ul>

*/
