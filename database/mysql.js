var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database \n", err);
    }
    console.log("Successfully connected to database");
});

module.exports = connection;
