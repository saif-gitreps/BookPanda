require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
   host: "localhost",
   database: "bookpanda",
   user: "root",
   password: "CSE123",
   // host: "bouduqkljsqzlrgmtj5h-mysql.services.clever-cloud.com",
   // user: "udcssrf6cbags5xq",
   // password: "4kDf9W4cxD257M8IENV3",
   // database: "bouduqkljsqzlrgmtj5h",
   // waitForConnections: true,
   // connectionLimit: 10,
   // queueLimit: 0,
});

pool.getConnection((err, connection) => {
   if (err) {
      console.error(`Error connecting to MySQL: ${err.message}`);
   } else {
      console.log("MySQL connected");
      connection.release();
   }
});

module.exports = pool;
