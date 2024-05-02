const mysql = require('mysql')
const express = require('express')

const app = express()
const port = 3000
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: 'admindb'
})

con.connect (err => {
  if (err){
   console.error('Error connecting to mysql:', err)
  }
  console.log('connected!...')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//create database using node
/*con.connect(function(err){
  if(err) throw err;
  console.log('connected!..')
  con.query("CREATE DATABASE mydb", function(err){
    if (err) throw err;
    console.log('Database created')
  })
})*/

//create table in db using node
/*con.connect(function(err){
  if(err) throw err;
  console.log('connected!..')
  con.query(
    `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    username varchar(255), 
    password_hash varchar(255))`, function(err){
    if (err) throw err;
    console.log('Table created')
  })
})*/


//retrive data from mysql 
// con.connect(function(err){
//   if (err) throw err;
//   console.log("connected!..")
//   con.query('SELECT * FROM tasks', function(err, result){
//     if (err) throw err;
//     console.log(result)
//   })
// })


//get the user all
app.get('/users', (req, res) => {
  con.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

//get the uaer by id
app.get('/users/:id', (req, res) => {
  const userId = req.params;
  const {id} = userId
  // console.log(id)
  con.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // console.log(results)
    res.json(results[0]);
    
  });
});

