const mysql = require('mysql');

let con = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DB_NAME
});

con.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    } 
    module.exports = con;
    console.log("Connected to MySQL...");
});

