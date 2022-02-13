const mysql = require('mysql');

let con = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : "highscoredb"
});

con.connect((err) => {
    if (err) {
        throw err;
    } 
    console.log("Connected to MySQL...");
});

module.exports = con;