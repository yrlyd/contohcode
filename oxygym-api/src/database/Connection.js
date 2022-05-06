const mysql = require('mysql')

// const dbConfig = {
//   host: "localhost",
//   user: "admin",
//   password: "admin",
//   port: 3306,
//   database: "oxygym"
// }

const dbConfig = {
  host: "localhost",
  user: "oxygymin_admin",
  password: "oxygymadmin",
  port: 3306,
  database: "oxygymin_oxygym_module"
}

const db = mysql.createPool(dbConfig)

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, sql) => {
      if (err) {
        console.log("Database error: ", err)
        reject(err)
      } else {
        sql.query(query, (err, results) => {
          if (err) {
            console.log("Query error: ", err)
            reject(err)
          } else {
            resolve(results)
          }

          sql.release()
        })
      }
    })
  })
}