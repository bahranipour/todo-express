const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
});


router.get('/',(req,res) => {
    connection.query('select * from todos',(err,results) => {
        if(err) throw err;
        res.render('index',{todos:results});
    });
});

router.post('/add',(req,res) => {
    const { title, description } = req.body;
    connection.query('insert into todos(title,description) values(?,?)',
        [title,description],(err) => {
            if(err) throw err;
            res.redirect('/');
        }
    );
});


router.post('/toggle/:id',(req,res) => {
    const { id } = req.params;
    connection.query(
        'update todos set completed = not completed where id = ?',
        [id],(err) => {
            if(err) throw err;
            res.redirect('/');
        }
    );
});

router.post('/delete/:id',(req,res) => {
    const { id } = req.params;
    connection.query('delete from todos where id = ?',
        [id],(err) => {
            if(err) throw err;
            res.redirect('/');
        }
    );
});

module.exports = router;
