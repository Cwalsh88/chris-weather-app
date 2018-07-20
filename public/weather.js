class Title extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const num = this.props.numOfDays;
    return (
      <div className="title">
        Check your {num.filter(x => x).length}-day Forecast
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={() => this.props.onClick()}>
        Change the forecast between 3 or 5 days!
      </button>
    );
  }
}

class Temperature extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const temp = this.props.temp;
    return (
      <div className="temperature"> 
        {temp.main.temp}
      </div>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const temp = this.props.temp
    const day = this.props.day
    const visible = this.props.visible
    return (
      <div className="card" style={{display: visible ? "inline-block" : "none"}}>
        <span className="day">{day}</span>
        <Temperature temp={temp} />
      </div>
    );
  }
} 

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleDays: Array(5).fill(true)
    }
  }

  handleClick() {
    const visibleDays = this.state.visibleDays.slice()
    visibleDays[3] = !visibleDays[3]
    visibleDays[4] = !visibleDays[4]
    this.setState({
      visibleDays: visibleDays
    }); 
  }
   
  render() {
    console.log("Rendering")
    const temps = this.props.temps
    const visibleDays = this.state.visibleDays
    return (
      <div className="app">
          <Title numOfDays={visibleDays} />
          <Card day="Monday" temp={temps[0]} visible={visibleDays[0]} />
          <Card day="Tuesday" temp={temps[8]} visible={visibleDays[1]}/>
          <Card day="Wednesday" temp={temps[16]} visible={visibleDays[2]}/>
          <Card day="Thursday" temp={temps[24]} visible={visibleDays[3]}/>
          <Card day="Friday" temp={temps[32]} visible={visibleDays[4]}/>
          <p>
            <Button onClick={() => this.handleClick()} />
          </p>
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

//Change some components to functional components when done

//tyle="color:blue;"

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


