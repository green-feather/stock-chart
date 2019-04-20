const fs = require('fs');
const { writeTenMillionTimes } = require('./StockData');

const ws = fs.createWriteStream('WeekData.csv');

writeTenMillionTimes(ws, 'utf-8', 'id,week,stockPrice,\n');