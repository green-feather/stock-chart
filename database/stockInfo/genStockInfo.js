const fs = require('fs');
const faker = require('faker');
const { companyData } = require('../companyData');
const { bar } = require('../progressBar');
const { generateInBetween, generateTags, 
        numberToPaddedString, generateDataPoints }
  = require('../generationMethods');

const ws = fs.createWriteStream('csv/StockInfo.csv');

// Generate stock chart data based on schema
const generateData = (index, numberOfEntries) => {
  // eslint-disable-next-line max-len
  return `${numberToPaddedString(numberOfEntries)},${companyData[index].company},` +
  `${numberToPaddedString(numberOfEntries)},` +
  `${generateInBetween(90, 200).toFixed(2)},` + 
  `${generateInBetween(1, 4).toFixed(2)},` + 
  `${generateDataPoints(generateInBetween(50, 200).toFixed(2))},` +
  `${generateDataPoints(generateInBetween(50, 200).toFixed(2))},` +
  `${generateDataPoints(generateInBetween(50, 200).toFixed(2))},` +
  `${generateDataPoints(generateInBetween(50, 200).toFixed(2))},` +
  `${generateDataPoints(generateInBetween(50, 200).toFixed(2))},` +
  `${generateDataPoints(generateInBetween(50, 200).toFixed(2))},` +
  `${generateTags(generateInBetween(2, 5, 'interger'))},` +
  `${faker.random.number()},` +
  `${generateInBetween(30, 90, 'interger')}`
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

