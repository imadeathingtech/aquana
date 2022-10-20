const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 10,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  dateStrings: ["DATE", "DATETIME"],
});

module.exports = connection;
