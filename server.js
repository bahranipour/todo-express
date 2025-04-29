const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to mysql database');
});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const todoRoutes = require('./routes/todos');
app.use('/',todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
});

