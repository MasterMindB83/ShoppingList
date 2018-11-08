const express = require('express');
const mySql= require('mysql');
const app = express();
/*app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    
    res.header("Access-Control-Allow-Origin", "localhost:3000/list");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL");
    res.header("Access-Control-Allow-Headers", "Overwrite, Destination, Content-Type, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If");

    res.header("Access-Control-Expose-Headers", "DAV, content-length, Allow");
    next();
  });*/
var mySqlConnection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'shoppinglist'
});
mySqlConnection.connect((err) => {
    if(err) 
        console.log(err);
    else 
        console.log('Connection successful.')
});
app.get('/list',(req,res) => {
    mySqlConnection.query('select * from list',(err,rows,fields)=>{
        if(err)
            console.log(err);
        else
            res.send(rows);
    })
});
app.delete('/delete/:name',(req,res) => {
    console.log('test');
    mySqlConnection.query(`delete from list where name = '`+ [req.params.name] + `'` ,(err)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log('Item deleted');
            res.send('Item deleted.')
        }
    })
});
app.post('/add/:name',(req,res) => {
    mySqlConnection.query(`insert into list(name) values(?)`, [req.params.name] ,(err,rows,fields)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log('Item added');
            res.send('Item saved.')
        }
    })
});
app.listen(3000, () => console.log('Listening on port 3000.'));
