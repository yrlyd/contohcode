const Connection = require('../database/Connection')
const CreateUser = require('./CreateUser.js')
const uuid = require('uuid')

module.exports = async (name, barcode, idNumber, dateOfBirth, address, phone, email, socialMedia, urgencyName, urgencyPhone, joinDate) => {
  var id = uuid.v1();
  try {
    const query = `INSERT INTO ` +
                    `customer_registration_data (registration_id, barcode, name, id_number, date_of_birth, address, phone, email, social_media, urgency_contact_name, urgency_contact_phone, join_date) ` +
                  `VALUES ` +
                    `('${id}', '${barcode}', '${name}', '${idNumber}','${dateOfBirth}','${address}','${phone}','${email}','${socialMedia}','${urgencyName}','${urgencyPhone}','${joinDate}')`

    // console.log(query);
    await Connection(query)
    var res = await CreateUser(email);
    console.log(res);
    return true
  } catch (err) {
    return false
  }
}