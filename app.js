// const serie = require('./fibonacci');

// let cantidad = 10;

// serie.crearSerie(cantidad)
//         .then(mensaje => console.log(mensaje))
//         .catch(mensaje => console.log(mensaje));

const config = require('config');
const inicioDebug = require('debug')('app:inicio');
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const morgan = require('morgan');
const jsonParser = bodyParser.json();
const logger = require('./logger');
const app = express();

//Configuración


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));

const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required()
});

let usuarios = [
    {id:1, nombre:'Luis'},
    {id:2, nombre:'Bob'},
    {id:3, nombre:'Maria'}
];

// Middleware
if (app.get('env') === 'development') {
    inicioDebug('Morgan habilitado...')
    app.use(morgan('tiny'));
}

app.use(logger);


app.get('/', (req, res) => {
    res.send('Probando 1,2,3...');
});

app.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
    let usuario = existeUsuario(parseInt(req.params.id));
    if(!usuario) res.status(404).send('ID de Usuario NO encontrado!')
    res.send(usuario);
});

app.post('/api/usuarios', jsonParser, function (req, res) {
    
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

app.put('/api/usuarios/:id', jsonParser, function (req, res) {
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

app.delete('/api/usuarios/:id', jsonParser, function (req, res) {
    let usuario = existeUsuario(parseInt(req.params.id));
    if(!usuario) {
        res.status(404).send('ID de Usuario NO encontrado!');
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index,1);
    res.send(usuario);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Puerto ${port}, habilitado!`);
});

function existeUsuario(id) {
    return usuarios.find(u => u.id === id);
}

function validaUsuario(nom) {
    return schema.validate({ nombre: nom });
}