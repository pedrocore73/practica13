var express = require('express');
var bcryptjs = require('bcryptjs');

var Usuario = require('../models/usuario');
var app = express();

app.post('/', (req, res)=>{
    var body = req.body;
    Usuario.findOne({email: body.email}, (err, data)=> {
        if(err) {
            return res.status(500).json({
                mensaje: 'El servidor de base de datos no responde',
                error: err
            })
        }
        if(!data) {
            return res.status(400).json({
                mensaje: 'El email no corresponde a ningún usuario'
            })
        }
        
        if(!bcryptjs.compareSync(body.password,data.password)) {
            return res.status(400).json({
                mensaje: 'Contraseña incorrecta'
            })
        }

        res.status(200).json({
            mensaje: 'Bienvenido de nuevo ' + data.nombre
        })
    })
})

module.exports = app;