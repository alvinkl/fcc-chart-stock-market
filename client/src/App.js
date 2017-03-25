import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { stock_name: '', result: [] }

    this.loadData = this.loadData.bind(this)
    this.setStockName = this.setStockName.bind(this)
  }

  componentWillMount() {

  }

  setStockName(e) {
    e.preventDefault()
    const stock_name = e.target.stock_name.value
    this.setState({ stock_name: stock_name }, () => this.loadData()) 
  }

  loadData(){
    const stock_name = this.state.stock_name
    const start_date = moment().subtract(7, 'days').format('YYYY-MM-DD')
    const end_date = moment().format('YYYY-MM-DD')

    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock_name}/data.json?start_date=${start_date}?end_date=${end_date}?api_key=2X-Xx139y2J_vF49-bzN`
    console.log(url)
    axios.get(url)
      .then(res => {
        var results = res.data.dataset_data.data.map(item => {
          const date = item[0]
          const m = Math.max.apply(Math, item.splice(1, item.length))
          return {date, m}
        })
        this.setState({ result: [...this.state.result, { name: '', data: results }] })
      })
  }

  render() {
    var result;
    if (this.state.result.length > 0) {
      console.log(this.state.result)
      result = this.state.result.map((item, index) => {
        console.log(item)
        return (
          item.data.map((i, index) => {
            return (
              <div key={ index }>
                <h1>{ i.date }</h1>
                <i>{ i.m }</i>
              </div>
            )
          })
        )
      })  
    }
    return (
      <div className="App">
        <form onSubmit={ this.setStockName }>
          <input type="text" name='stock_name'/>
          <button type='submit'>Submit</button>
        </form>
        { result }
      </div>
    );
  }
}

export default App;
