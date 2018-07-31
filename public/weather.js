class Title extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const num = this.props.numOfDays;
    return (
      <div className="title">
        Check your {num.filter(x => x).length} day Forecast
      </div>
    )
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
    )
  }
}

class Temperature extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list
    return (
      <div className="temperature"> 
        {list.main.temp}
      </div>
    )
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {list, visible} = this.props
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
          Zipcode:
            <input type="text" value={this.state.NewZipcode} onChange={this.updateState}/>
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
      list: [],
      city: [],
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
      .then(data => this.setState({ list: data.list, city: data.city, isLoading: false}))
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
    const { list, city, visibleDays, isLoading, zipcode } = this.state

    if (isLoading) {
      console.log("Backing out of rendering until promise finishes")
      return <p>Loading...</p>
    }

    return (
      <div className="app">
          <Title numOfDays={visibleDays} />
          <Card list={list[0]} visible={visibleDays[0]} />
          <Card list={list[7]} visible={visibleDays[1]} />
          <Card list={list[15]} visible={visibleDays[2]} />
          <Card list={list[23]} visible={visibleDays[3]} />
          <Card list={list[31]} visible={visibleDays[4]} />
          <p><Button onClick={() => this.handleClick()} /></p>
          <p>Current City Displayed: {city.name}</p>
          <Form onSubmit={this.updateZipcode} />
      </div>
    )
  }
}

console.log("Beginning of App")

const rootElement = document.getElementById("root")
ReactDOM.render(<Container />, rootElement)

//Change some components to functional components when done

//Get rid of the <p> tags in Card, Style the app properly through CSS

//Expand and Collapse over Button