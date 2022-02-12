const mysql = require('mysql');

let con = mysql.createConnection({
    host: "highscoredb.cu8dsr4nmcwp.us-east-1.rds.amazonaws.com",
    user: "Lamzo",
    password: "password",
    database: "highscoredb"
});

con.connect((err) => {
    if (err) {
        throw err;
    } 
    console.log("Connected to MySQL...");
});

module.exports = con;