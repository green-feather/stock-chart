const faker = require('faker');

module.exports = {
  
  // Generate stock chart data based on schema
  generateData: (index, numberOfEntries) => {
    return `${module.exports.numberToPaddedString(numberOfEntries)},${index},
            ${module.exports.generateDataPoints(
              module.exports.generateInBetween(50, 200).toFixed(2)
              )}\n`;
  },

  // Creates random data points that are 5-25 points above or below previous data point
  generateDataPoints: (init) => {
    let array = [];
    for (var i = 0; i < 10; i += 1) {
      array.push(Math.abs(module.exports.generateInBetween(
      init - module.exports.generateInBetween(5, 25, 'interger'),
      init + module.exports.generateInBetween(5, 25, 'interger')).toFixed(2)));
    }
    array = array.join('|');
    return array;
  },

  // Creates a random number between min & max
  generateInBetween: (min, max, type) => {
    if (type === 'interger') {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
    } else {
      return (Math.random() * (max - min)) + min; 
    }
  },
  
  // Creates fake stock tag names
  generateTags: (number) => {
    number = number || 3;
    let returnArr = [];
    for (let i = 0; i < 5; i++) {
      if (i > number) {
        returnArr.push(null);
        continue;
      }
      returnArr.push(faker.fake("{{commerce.department}}"));
    }
    return returnArr;
  },
  
  // Creates a sring number padded with zeros up to ten digits
  numberToPaddedString: (number) => {
    return number.toString().padStart(9, '0');
  }
}