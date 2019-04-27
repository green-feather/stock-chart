const fs = require('fs');
const { companyData } = require('../companyData');
const { bar } = require('../progressBar');
const { numberToPaddedString }
  = require('../generationMethods');

const ws = fs.createWriteStream('csv/StockIds.csv');

// Generate stock chart data based on schema
const generateData = (index, numberOfEntries) => {
  // eslint-disable-next-line max-len
  return `${companyData[index].ticker}${numberToPaddedString(numberOfEntries)}`
};

// Write 10M data stringified objects to csv file using stream & drain
function writeTenMillionTimes(writer, encoding) {
  let i = 10000000;
  let idx = 0;
  write();
  function write() {
    let ok = true;
    do {
      let data = generateData(idx, i) + '\n';
      i--;
      //Update progress bar
      bar.tick();

      //Loop through company names array
      if (i % 100 === 0) {
        idx += 1;
      }
      if (idx === 99) {
        idx = 0;
      }

      // Write data to write stream
      if (i === 0) {
        writer.write(data, encoding);
      } else {
        if (i > 9000000) {
          ok = writer.write(data, encoding);
        } else if (i > 8000000 && i % 8) {
          ok = writer.write(data, encoding);
        } else if (i % 10 === 0) {
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 0 && ok);

    // Trigger drain event when return of write method is false
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}
writeTenMillionTimes(ws, 'utf-8')

