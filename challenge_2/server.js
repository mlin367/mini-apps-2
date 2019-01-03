const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));

app.get('/api', (req, res) => {
  let { currency, startDate, endDate } = req.query;
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`
    )
    .then(data => {
      res.status(200).send(data.data.bpi);
    })
    .catch(err => {
      console.error(err);
    });
});

const port = 1337;

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
