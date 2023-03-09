const mysql = require('mysql');
require('dotenv');

let con = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    port:process.env.DB_PORT,
    database:process.env.DB,
    multipleStatements:true
});
module.exports = con;