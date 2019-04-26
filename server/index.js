/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const client = require('../database/index');
const { getOne, updateOne, postOne, deleteOne } = require('../database/StockChart.js');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})

app.get('/api/:stockId', async (req, res) => {
  console.log('Got a request searching for', req.params.stockId);
  const data = await getOne(req.params.stockId);

  ///// Reformat response data to work with client-side ////////
  let relatedTags = [data.relatedtags_1, data.relatedtags_2, 
    data.relatedtags_3, data.relatedtags_4, data.relatedtags_5];

  //Splice empty tags
  for (let i = 0; i < relatedTags.length; i += 1) {
    if (relatedTags[i].length === 0) {
      relatedTags.splice(i, 1);
      i -= 1;
    }
  }
  const [stockCompany, noOfOwners, recommendationPercent] = 
    [data.stockcompany, data.noofowners, data.recommendationpercent];
  const stockInfo = 
    {relatedTags, stockCompany, noOfOwners, recommendationPercent}
  const [day, week, month, threeMonth, year, fiveYear] =
    [data.prices_day.split('|'), data.prices_week.split('|'),
    data.prices_month.split('|'),data.prices_threemonth.split('|'),
    data.prices_year.split('|'), data.prices_fiveyear.split('|')];
  const stockData = {day, week, month, threeMonth, year, fiveYear};
  const [id, stockId, averageStock, changePercent] = 
    [data.id, data.stockid, data.averagestock, data.changepercent]
  const stock = _.extend(
    {id, stockId, averageStock, changePercent}, 
    {stockInfo}, 
    {stockData}
  );
  ///////////////////// end of reformat ////////////////////////

  // Send data to client-side and disconnect from database
  res.send([stock]);
})

app.get('/:stockId', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/dist/index.html'));
});
