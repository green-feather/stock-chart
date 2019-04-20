const ProgressBar = require('progress');

module.exports.bar = new ProgressBar('[:bar] :percent', {
  complete: '=', 
  incomplete: ' ',
  width: 20,
  total: 10000000 }
);