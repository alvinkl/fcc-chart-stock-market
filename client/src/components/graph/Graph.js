import React, { Component } from 'react'
import RC2 from 'react-chartjs2'
import moment from 'moment'

export default class Graph extends Component {
  constructor(props) {
    super(props)
    this.labels = []
    this.state = { datasets: [] }

    this.generateData = this.generateData.bind(this)
    this.getRandomColor = this.getRandomColor.bind(this)
  }

  componentWillReceiveProps(props) {
    this.labels = props.data[0] ? props.data[0].data.map(d => d.date) : []
    const newData = props.data[props.data.length - 1]
    const nd = newData ? newData.data.map(d => d.val) : []

    if (nd && newData) this.generateData(newData.name, nd)
  }

  getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  generateData(name, data) {
    const color = this.getRandomColor()
    const tempData = {
      label: name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: color,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
    }
    
    this.setState({
      datasets: [ ...this.state.datasets, tempData ]
    })
  }

  render() {
    const data = {
      labels: this.labels,
      datasets: this.state.datasets,
    };

    const options = { 
      hover: 'x',
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    }
    return ( 
      <RC2 data={ data } options={ options } type='line' />
    )
  }
}