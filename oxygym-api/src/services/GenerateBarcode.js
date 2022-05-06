const Connection = require('../database/Connection')
const uuid = require('uuid')

module.exports = async (barcode, createdDate) => {
  // var barcode = uuid.v1();
  try {
    const query = `INSERT INTO ` +
                    `registration_code (barcode, created_date) ` +
                  `VALUES ` +
                    `('${barcode}','${createdDate}')`
    await Connection(query)
    return true
  } catch (err) {
    return false
  }
}