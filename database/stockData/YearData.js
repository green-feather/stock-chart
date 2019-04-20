const fs = require('fs');
const { writeTenMillionTimes } = require('./StockData');

const ws = fs.createWriteStream('YearData.csv');

writeTenMillionTimes(ws, 'utf-8', 'id,year,stockPrice,\n');