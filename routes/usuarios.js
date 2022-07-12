const express = require('express');
const bodyParser = require('body-parser');

const rutas = express.Router();
const Joi = require('joi');

let usuarios = [
    {id:1, nombre:'Luis'},
    {id:2, nombre:'Bob'},
    {id:3, nombre:'Maria'}
];

const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required()
});

const jsonParser = bodyParser.json();

rutas.use(bodyParser.urlencoded({extended:true}))
rutas.use(bodyParser.json())

rutas.get('/', (req, res) => {
    res.send(usuarios);
});

rutas.get('/:id', (req, res) => {
    let usuario = existeUsuario(parseInt(req.params.id));
    if(!usuario) res.status(404).send('ID de Usuario NO encontrado!')
    res.send(usuario);
});

rutas.post('/', jsonParser, function (req, res) {
    
    const {error, value} = validaUsuario(req.body.nombre);
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: req.body.nombre
        };
        usuarios.push(usuario);
        res.send(usuario);
    } else {
        res.status(400).send(error.details[0].message);
    }
});

rutas.put('/:id', jsonParser, function (req, res) {
    let usuario = existeUsuario(parseInt(req.params.id));
    if(!usuario) {
        res.status(404).send('ID de Usuario NO encontrado!');
        return;
    }

    const {error, value} = validaUsuario(req.body.nombre);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    usuario.nombre = value.nombre;
    res.send(usuario);
});

rutas.delete('/:id', jsonParser, function (req, res) {
    let usuario = existeUsuario(parseInt(req.params.id));
    if(!usuario) {
        res.status(404).send('ID de Usuario NO encontrado!');
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index,1);
    res.send(usuario);
});

function existeUsuario(id) {
    return usuarios.find(u => u.id === id);
}

function validaUsuario(nom) {
    return schema.validate({ nombre: nom });
}

module.exports = rutas;