const Connection = require('../database/Connection')

module.exports = async (email) => {
  try {
    const query = `SELECT ` +
                    `username, token ` +
                  `FROM ` +
                    `customer_data ` +
                  `WHERE ` +
                    `username = ` +
                  `'${email}'`

    const results = await Connection(query)
    console.log(results);
    return results
  } catch (err) {
    return []
  }
}