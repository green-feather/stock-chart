const { Client } = require('pg');

const client = new Client({
  user: 'tlindow',
  database: 'stock-chart'
})
client.connect();

module.exports = client;