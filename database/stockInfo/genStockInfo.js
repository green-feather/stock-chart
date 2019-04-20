const fs = require('fs');
const faker = require('faker');
const { companyData } = require('../companyData');
const { bar } = require('../progressBar');
const { generateInBetween, generateTags, numberToPaddedString }
  = require('../generationMethods');

const ws = fs.createWriteStream('csv/StockInfo.csv');

// Generate stock chart data based on schema
const generateData = (index, numberOfEntries) => {
  // eslint-disable-next-line max-len
  return `${numberToPaddedString(numberOfEntries)},${companyData[index].company},${generateTags(generateInBetween(2, 5, 'interger'))},${faker.random.number()},${generateInBetween(30, 90, 'interger')}`
};

// Write 10M data stringified objects to csv file using stream & drain
function writeTenMillionTimes(writer, encoding) {
  let i = 10000000;
  let idx = 0;
  writer.write('id,stockCompany,relatedTags__relatedTags1,' +
               'relatedTags__relatedTags2,' +
               'relatedTags__relatedTags3,' +
               'relatedTags__relatedTags4,relatedTags__relatedTags5,' +
               'noOfOwners,recommendationPercent\n');
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

