const fs = require('fs');
const { bar } = require('../progressBar');
const { generateInBetween, numberToPaddedString } =
  require('../generationMethods');

const ws = fs.createWriteStream('csv/StockMain.csv');

// Generate stock chart data based on schema
const generateData = (_index, numberOfEntries) => {
  // eslint-disable-next-line max-len
  return `${numberToPaddedString(numberOfEntries)},${numberToPaddedString(numberOfEntries)},${generateInBetween(90, 200).toFixed(2)},${generateInBetween(1, 4).toFixed(2)}`;
};

// Write 10M data stringified objects to csv file using stream & drain
function writeTenMillionTimes(writer, encoding) {
  let i = 10000000;
  let idx = 0;
  writer.write('id,stockId,averageStock,changePercent\n');
  write();
  function write() {
    let ok = true;
    do {
      let data = generateData(idx, i) + '\n';
      i--;
      //Update progress bar
      bar.tick();

      // Write data to write stream
      if (i === 0) {
        writer.write(data, encoding);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    // Trigger drain event when return of write method is false
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}
writeTenMillionTimes(ws, 'utf-8')