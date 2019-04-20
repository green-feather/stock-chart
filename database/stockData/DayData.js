const fs = require('fs');
const { writeTenMillionTimes } = require('./StockData');

const ws = fs.createWriteStream('DayData.csv');

writeTenMillionTimes(ws, 'utf-8', 'id,day,stockPrice,\n');