const fs = require('fs');
const { writeTenMillionTimes } = require('./StockData');

const ws = fs.createWriteStream('ThreeMonthData.csv');

writeTenMillionTimes(ws, 'utf-8', 'id,threeMonth,stockPrice,\n');