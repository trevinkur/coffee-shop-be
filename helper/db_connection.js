const mysql = require("mysql2");

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    debug: false
  })
  
//   db.connect((err)=> {
//     if (err) {
//       console.log(err)
//     }
//     console.log("db connected")
// })

module.exports = db;