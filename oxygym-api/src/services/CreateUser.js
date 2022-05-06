const Connection = require('../database/Connection')
const generator = require('generate-password')
const uuid = require('uuid')

module.exports = async (email) => {
  const customerId = uuid.v1();
  const id = `SELECT ` +
    `registration_id ` +
    `FROM ` +
    `customer_registration_data ` +
    `WHERE ` +
    `email = ` + `'${email}'`;
  
  var regisId = await Connection(id)
  // console.log("IDNYA WOOY = " + regisId[0].registration_id);
  var token = generator.generate({
    length: 10,
    numbers: true
  });
  try {
    const query = `INSERT INTO ` +
      `customer_data (customer_id, registration_id, username, token) ` +
      `VALUES ` +
      `('${customerId}','${regisId[0].registration_id}', '${email}','${token}')`

    console.log(query);
    await Connection(query)

    return true
  } catch (err) {
    return false
  }
}