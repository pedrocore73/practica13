var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var usuario = require('./routes/usuario');
var login = require('./routes/login');

var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/iam',{useNewUrlParser: true})
            .then(()=>{
                console.log('Conexión ok a Database');
            })
            .catch((err)=>{
                console.error('Error de conexión', err);
            })

// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Header: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
//     res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
//     next();
// })

app.use(cors());

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/usuario', usuario);
app.use('/login', login);

app.listen(3000, function(){
    console.log('Servidor Ok en http://localhost:3000');
})
