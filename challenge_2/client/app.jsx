import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import Chart from 'chart.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      startDate: '',
      endDate: '',
      bpi: {},
      value: 'line'
    };
    this.date = moment();
    this.priorDate = new Date().setDate(new Date().getDate() - 60);
    this.twoMonthsAgo = moment(new Date(this.priorDate));
    this.ctx = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      startDate: this.twoMonthsAgo.format('YYYY-MM-DD'),
      endDate: this.date.format('YYYY-MM-DD')
    }, () => {
      this.fetch();
    });
  }

  fetch() {
    axios.get('/api', {
      params: {
        currency: this.state.currency,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    })
    .then(data => {
      console.log(data.data);
      this.setState({
        bpi: data.data
      }, () => {
        this.chartSetUp();
      })
    })
  }

  chartSetUp() {
    const myChart = new Chart(this.ctx.current, {
      type: this.state.value,
      data: {
        labels: Object.keys(this.state.bpi),
        datasets: [{
          label: `bpi in ${this.state.currency}`,
          data: Object.values(this.state.bpi),
          borderWidth: 1
        }]
      },
    })
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value
    }, () => {
      this.chartSetUp();
    })
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Price Index Chart</h1>
        <canvas ref={this.ctx} width="400" height="400"></canvas>
        <form>
          <select value={this.state.value} onChange={this.handleOnChange}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
          </select>
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
