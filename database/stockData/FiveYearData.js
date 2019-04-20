const fs = require('fs');
const { writeTenMillionTimes } = require('./StockData');

const ws = fs.createWriteStream('FiveYearData.csv');

writeTenMillionTimes(ws, 'utf-8', 'id,fiveYear,stockPrice,\n');