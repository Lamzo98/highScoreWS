const mysql = require('mysql');

let con = mysql.createConnection({
    host     : "aa1aykk7fcu694s.cu8dsr4nmcwp.us-east-1.rds.amazonaws.com",
    user     : "admin",
    password : "password",
    port     : 3306,
    database : "ebdb"
});

con.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    } 
    
    console.log("Connected to MySQL...");
});


module.exports = con;
