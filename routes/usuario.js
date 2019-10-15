var express = require('express');
var bcryptjs = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res)=>{
    var body = req.body;
    
    var usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10)
    })

    usuario.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                mensaje: 'Error al crear usuario',
                error: err
            })
        }

        res.status(200).json({
            mensaje: 'Usuario creado correctamente'
        })

    })

})

app.get('/', (req, res)=>{
    Usuario.find({}).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                mensaje: 'Error de conexión con Database',
                error: err
            })
        }

        res.status(200).json({
            usuarios: data
        })
    })
})

app.put('/:id', (req, res)=>{

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario)=>{

        if(err) {
            return res.status(400).json({
                mensaje: 'Error de conexión con Database',
                error: err
            })
        }

        usuario.nombre = body.nombre;
        usuario.apellidos = body.apellidos;
        // usuario.email = body.email;
        usuario.password = bcryptjs.hashSync(body.password, 10);

        usuario.save((err, usuarioMod)=>{
            if(err) {
                return res.status(400).json({
                    mensaje: 'Error de actualización de usuario',
                    error: err
                })
            }
            res.status(200).json({
                mensaje: 'Usuario ' + usuarioMod.nombre + ' correctamente actualizado'
            })
        })

    })

})

app.delete('/:id', (req, res)=>{

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorr)=>{
        if(err) {
            return res.status(400).json({
                mensaje: 'Error de borrado de usuario',
                error: err
            })
        }

        res.status(200).json({
            mensaje: 'Usuario ' + usuarioBorr.nombre + ' eliminado correctamente'
        })
    })

})

module.exports = app;
