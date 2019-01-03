import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      startDate: '',
      endDate: ''
    };
    this.date = new Date();
    this.priorDate = new Date().setDate(this.date.getDate() - 60);
    this.twoMonthsAgo = new Date(this.priorDate);
  }

  componentDidMount() {
    this.setState({
      startDate: {
        year: this.twoMonthsAgo.getFullYear(),
        month: this.twoMonthsAgo.getMonth() + 1,
        day: this.twoMonthsAgo.getDate()
      },
      endDate: {
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1,
        day: this.date.getDate()
      }
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
      console.log(data)
    })
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Price Index Chart</h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
