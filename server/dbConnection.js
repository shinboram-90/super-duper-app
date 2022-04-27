const mysql = require('mysql');

const pool = mysql.createPool({
  // connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  multipleStatements: true,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(
    `Connection created with Mysql successfully, connected as id ${connection.threadId}`
  );
});

module.exports = pool;
