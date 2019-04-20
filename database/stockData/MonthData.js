const fs = require('fs');
const { writeTenMillionTimes } = require('./StockData');

const ws = fs.createWriteStream('csv/MonthData.csv');

writeTenMillionTimes(ws, 'utf-8', 'id,month,stockPrice,\n');