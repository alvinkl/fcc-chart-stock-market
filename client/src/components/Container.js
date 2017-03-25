import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import { socketConnect } from 'socket.io-react'

import Graph from './graph'

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = { stock_names: [], result: [] }

    this.loadData = this.loadData.bind(this)
    this.setStockName = this.setStockName.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }

  componentWillMount() {
    axios.get('http://localhost:3100')
      .then((res) => {
        this.setState({ stock_names: res.data.name })
        res.data.name.forEach(item => this.initData(item))
    })
  }

  setStockName(e) {
    e.preventDefault()
    this.props.socket.emit('test', 'Hello world')

    const stock_name = e.target.stock_name.value
    console.log('------------------------------------');
    console.log(this.state.stock_names);
    console.log('------------------------------------');
    if (this.state.stock_names.indexOf(stock_name) === -1) this.loadData(stock_name)
  }

  loadData(stockName){
    const stock_name = stockName
    const start_date = moment().subtract(1, 'month').format('YYYY-MM-DD')
    const end_date = moment().format('YYYY-MM-DD')

    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock_name}/data.json?start_date=${start_date}?end_date=${end_date}?api_key=2X-Xx139y2J_vF49-bzN`
    console.log(url)
    axios.get(url)
      .then(res => {
        var results = res.data.dataset_data.data.map(item => {
          const date = item[0]
          const m = Math.max.apply(Math, item.splice(1, item.length))
          return {date: date, val: m}
        })
        this.setState({ result: [...this.state.result, { name: stock_name, data: results }] }, () => {
          axios.post('http://localhost:3100', { stockname: stock_name })
            .then((res) => console.log(res.data.name))
        })
      })
  }

  initData(stockName) {
    const stock_name = stockName
    const start_date = moment().subtract(1, 'month').format('YYYY-MM-DD')
    const end_date = moment().format('YYYY-MM-DD')

    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock_name}/data.json?start_date=${start_date}?end_date=${end_date}?api_key=2X-Xx139y2J_vF49-bzN`
    console.log(url)
    axios.get(url, { methods: 'GET' })
      .then(res => {
        var results = res.data.dataset_data.data.map(item => {
          const date = item[0]
          const m = Math.max.apply(Math, item.splice(1, item.length))
          return {date: date, val: m}
        })
        this.setState({ result: [...this.state.result, { name: stock_name, data: results }] })
      })
  }

  handleRemoveItem(e) {
    const stockname = e.target.name
    axios.delete('http://localhost:3100', { stockname: stockname })
      .then(res => console.log(res))
  }

  render() {
    const listStocks = this.state.stock_names ? this.state.stock_names.map(name => (
      <div>
        <button onClick={ this.handleRemoveItem } keys={ name } name={ name }>{ name }</button>
      </div>
    )) : null
    console.log('------------------------------------');
    console.log(listStocks);
    console.log('------------------------------------');
    return (
      <div>
        <Graph data={ this.state.result } />
        <form onSubmit={ this.setStockName }>
          <input type="text" name='stock_name'/>
          <button type='submit'>Submit</button>
        </form>
        { listStocks }
      </div>
    );
  }
}

export default socketConnect(Container);
