const { bar } = require('../progressBar');
const { numberToPaddedString, generateDataPoints, generateInBetween } 
  = require('../generationMethods');

// Write 10M data stringified objects to csv file using stream & drain
module.exports = {
  generateData: (index, numberOfEntries) => {
    // eslint-disable-next-line max-len
    return `${numberToPaddedString(numberOfEntries)},${index},${generateDataPoints(generateInBetween(50, 200).toFixed(2))}\n`;
  },

  writeTenMillionTimes: (writer, encoding, tableHeader) => {
    let i = 10000000;
    let idx = 0;
    const write = () => {
      let ok = true;
      do {
        let data = module.exports.generateData(idx, i);

        //Loop through stockData points
        if (idx < 10) {
          idx += 1;
        }
        if (idx === 10) {
          idx = 0;
          i--;
          //Update progress bar
          bar.tick();
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
    writer.write(tableHeader);
    write();
  }
}