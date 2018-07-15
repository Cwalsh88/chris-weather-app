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
  constructor(props) {
	super(props);
  }
   
  render() {
	console.log("Rendering");
	let temps = this.props.temps;
	return (
      <div className="box">
        <CardTitle />
        <Temperature />
		<ul>
			{temps.map(day =>
				<li key={day.dt}>
					{day.main.temp}
				</li>
			)}
		</ul>
	  </div>
    );
  }
}

console.log("Beginning of App, can write JS freely here");
var myTemps = [];
fetch('https://api.openweathermap.org/data/2.5/forecast?zip=30319,us&APPID=2ec71497636bbe75193d9958f68a8c5b&cnt=1&units=imperial')
      .then(response => response.json())
      .then(data => {
		  myTemps = data.list; 
		  const rootElement = document.getElementById("root");
		  ReactDOM.render(<Container temps={myTemps}  />, rootElement);
	  }); 

//Then passed down in the application as props.
