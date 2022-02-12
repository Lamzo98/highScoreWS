const express = require('express');
const db = require('./DBConnection');
const Joi = require('joi');

//Entry point
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.status(201).send("Welcome to the highScore applicaion.")
});

app.get('/api/scores', (req, res) => {
    let sql = "SELECT * FROM scores";
    db.query(sql, (error, result) => {
        if(error) throw error;
        res.status(201).send(result);
    });
});

app.get('/api/scores/:id', (req, res) => {
    
    let sql = `SELECT * FROM scores WHERE id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(Object.keys(result).length === 0) {
            res.status(201).send("No row was found with the given parameters.");
        }
        else {
            res.status(200).send(result);
        }
        
    });
});

app.post('/api/scores', (req, res) => {
    let score = req.body;
    let {error} = validateScore(score);

    if(error) throw error;

    let sql = `INSERT INTO scores(value, date) VALUES(${score.value}, '${score.date}')`;
    
    db.query(sql, (err, result) => {
       if (err) throw err;
       res.status(201).send(`score successfuly inserted with id=${result.insertId}`);
    });
    
});

app.put('/api/scores/:id', (req, res) => {
    let score = req.body;
    let {error} = validateScore(score);

    if(error) throw error;

    let sql = `UPDATE scores SET value=${score.value}, date='${score.date}'`;
    
    db.query(sql, (err, result) => {
       if (err) throw err;
       res.status(201).send("score successfuly updated!");
    });
});

app.delete('/api/scores/:id', (req, res) => {
    
     let sql = `DELETE FROM scores WHERE id=${req.params.id}`;
    
     db.query(sql, (err, result) => {
        if (err) console.log( err);
        res.status(201).send("score successfuly deleted!");
     });
    res.status(200);
});

function validateScore(score) {
    let schema = Joi.object({
        value: Joi.number().min(0).required(),
        date: Joi.date().required(),
    });
    return schema.validate(score);
}


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port: ${port}`);
})