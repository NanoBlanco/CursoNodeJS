// const serie = require('./fibonacci');

// let cantidad = 10;

// serie.crearSerie(cantidad)
//         .then(mensaje => console.log(mensaje))
//         .catch(mensaje => console.log(mensaje));

const config = require('config');
const inicioDebug = require('debug')('app:inicio');
const express = require('express');

const morgan = require('morgan');

const logger = require('./logger');
const usuarios = require('./routes/usuarios');
const app = express();

//Configuración
app.use(express.static('public'));
app.use('/api/usuarios', usuarios)

// Middleware
if (app.get('env') === 'development') {
    inicioDebug('Morgan habilitado...')
    app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
    res.send('Probando 1,2,3...');
});

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Puerto ${port}, habilitado!`);
});
