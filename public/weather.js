function Title(props) {
  const num = props.numOfDays;
  return (
    <div className="title">
      Check your {num.filter(x => x).length} day Forecast
    </div>
  )
}

function Button(props) {
  const num = props.numOfDays;
  return (
      <button onClick={props.onClick}>
        {num[4] ? "Collapse" : "Expand"} the Forecast
      </button>
  )
}

function Temperature(props) {
  const list = props.list
  return (
    <div className="temperature"> 
      {list.main.temp}
    </div>
  )
}

function Card(props) {
  const {list, visible} = props
  const date = new Date(list.dt_txt)
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday",
     "Thursday", "Friday", "Saturday"]
  return (
    <div className="card" style={{display: visible ? "inline-block" : "none"}}>
      <span className="day">{weekday[date.getDay()]}</span>
      <Temperature list={list} />
    </div>
  )
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      NewZipcode: ''
    }
    this.updateState = this.updateState.bind(this)
    this.submitInput = this.submitInput.bind(this)
  }

  updateState(event) {
   this.setState({
    NewZipcode: event.target.value
   })
  }

  submitInput(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.NewZipcode)
  }

  render() {
    return (
      <form onSubmit={this.submitInput}>
        <label>
          Enter a zipcode to change the city: 
            <input type="text" pattern="[0-9]{5}" title="Must be 5 digits" value={this.state.NewZipcode} onChange={this.updateState}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherAPI: [],
      visibleDays: Array(5).fill(true),
      isLoading: true,
      zipcode: '30319'
    }

    this.updateZipcode = this.updateZipcode.bind(this)
  }

  componentDidMount() {
    console.log("Loading API")
    this.setState({ isLoading: true})
    fetch('https://api.openweathermap.org/data/2.5/forecast?zip=30319,us&APPID=2ec71497636bbe75193d9958f68a8c5b&cnt=40&units=imperial')
      .then(response => response.json())
      .then(data => this.setState({ weatherAPI: data, isLoading: false}))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.zipcode !== this.state.zipcode) {
      const zipcode = this.state.zipcode
      const url = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zipcode + ',us&APPID=2ec71497636bbe75193d9958f68a8c5b&cnt=40&units=imperial'
      this.setState({ isLoading: true})
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ weatherAPI: data, isLoading: false}))
    }
  }

  handleClick() {
    const visibleDays = this.state.visibleDays.slice()
    visibleDays[3] = !visibleDays[3]
    visibleDays[4] = !visibleDays[4]
    this.setState({
      visibleDays: visibleDays
    })
  }
  
  updateZipcode(data) {
    this.setState({
      zipcode: data
    })
  }

  render() {
    console.log("Re-rendering")
    const { weatherAPI, visibleDays, isLoading, zipcode } = this.state

    if (isLoading) {
      console.log("Backing out of rendering until promise finishes")
      return <p>Loading...</p>
    }

    return (
      <div className="app">
          <Title numOfDays={visibleDays} />
          <Card list={weatherAPI.list[0]} visible={visibleDays[0]} />
          <Card list={weatherAPI.list[7]} visible={visibleDays[1]} />
          <Card list={weatherAPI.list[15]} visible={visibleDays[2]} />
          <Card list={weatherAPI.list[23]} visible={visibleDays[3]} />
          <Card list={weatherAPI.list[31]} visible={visibleDays[4]} />
          <p><Button numOfDays={visibleDays} onClick={() => this.handleClick()} /></p>
          <p>Current City Displayed: {weatherAPI.city.name}</p>
          <Form onSubmit={this.updateZipcode} />
      </div>
    )
  }
}

console.log("Beginning of App")

const rootElement = document.getElementById("root")
ReactDOM.render(<Container />, rootElement)

//Get rid of the <p> tags in Card, Style the app properly through CSS