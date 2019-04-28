/* eslint-disable no-console */
const client = require('./index');

module.exports = { 
  getOne: (selector) => {
    return client.query(
      'select * from stockinfo where stockid=$1',
      [selector])
    .then((res) => {
      return res.rows[0];
    })
    .catch(e => console.error(e.stack));
  },
  
  updateOne: (selector) => {
    return client.query(
      'update stockinfo set changePercent=5.11 where stockId=$1',
      [selector])
    .catch(e => console.error(e.stack))
  },

  deleteOne: (selector) => {
    return client.query(
      'delete from stockinfo where stockId=$1',
      [selector])
    .catch(e => console.error(e.stack))
  },

  postOne: () => {
    const query = "insert into stockinfo values" +
    "('000000001', 'Plug Power000000001', 'PLUG000000001', " + 
    "'102.81','5.11'," +
    "'52.1|50.91|49.07|67.04|65.45|59.01|64.65|56.94|66.16|59.63'," +
     "'168.64|174.84|175.59|161.94|161.75|168.04|160.94|166.7|170.47|169.3'," +
     "'186.25|179.42|183.36|185.51|173.32|181.06|182.31|179.08|185.79|186.61'," +
     "'128.52|136.68|134.77|138.14|129.88|129.37|133.77|134.02|129.28|131.77'," +
     "'181.76|175.03|180.94|168.74|177.05|180.69|178.41|164.16|170.7|176.65'," +
     "'113.34|103.68|98.42|112.21|113.96|114.39|121.19|117.3|114.42|118.8', 'Toys'," +
     "'Toys','Computers','Outdoors','',7173,72)";
    return client.query(query)
    .then(() => {
      console.log('Posted a record!');
    })
    .catch(e => console.error(e.stack))
  },

}