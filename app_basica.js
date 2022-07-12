// const serie = require('./fibonacci');

// let cantidad = 10;

// serie.crearSerie(cantidad)
//         .then(mensaje => console.log(mensaje))
//         .catch(mensaje => console.log(mensaje));

// const config = require('config');
// const inicioDebug = require('debug')('app:inicio');
// const express = require('express');

// const morgan = require('morgan');

// const logger = require('./logger');
// const usuarios = require('./routes/usuarios');
// const app = express();

// //Configuración
// app.use(express.static('public'));
// app.use('/api/usuarios', usuarios)

// // Middleware
// if (app.get('env') === 'development') {
//     inicioDebug('Morgan habilitado...')
//     app.use(morgan('tiny'));
// }

// app.get('/', (req, res) => {
//     res.send('Probando 1,2,3...');
// });

// app.use(logger);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Puerto ${port}, habilitado!`);
// });


// Conectando a MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo')
        .then(()=> console.log('Conectado!'))
        .catch(err => console.log('Problema al conectar', err));

const plantillaSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    profesion: String,
    fecha: {type: Date, default: Date.now},
    estado: Boolean
});

const Plantilla = mongoose.model('Plantilla', plantillaSchema);

async function creaPlantilla() {
    try {
        
        const plantilla1 = new Plantilla({
            nombre: 'Maria Herrera',
            edad: 42,
            profesion: 'Odontologa',
            estado: true
        });
     
        const resulta1 = await plantilla1.save();
        console.log(`El documento fue insertado con el id: ${resulta1._id}`);

        const plantilla2 = new Plantilla({
            nombre: 'Rey Blanco',
            edad: 50,
            profesion: 'Ingeniero',
            estado: true
        });
     
        const resulta2 = await plantilla2.save();
        console.log(`El documento fue insertado con el id: ${resulta2._id}`);

    }catch (error) {
        console.log('Problema con inserción ->', error);
    }
}

//creaPlantilla();

async function listarPlantilla() {
    const lista = await Plantilla
        .find()
        .sort({ nombre: 1})
        .select({ nombre: 1, edad: 1});
    console.log(lista);
}

async function actualizaPlantilla(id) {
    // const actualiza = await Plantilla.findById(id);
    // if(!actualiza){
    //     console.log('Id No encontrado!');
    //     return;
    // }
    // actualiza.profesion = 'Economista';

    // actualiza.set({ 
    //     nombre: 'Luisa Blanco',
    //     edad: 56
    // });

    // const resultado = await actualiza.save();

    // const resultado = await Plantilla.updateOne({_id: id}, {
    //     $set: {
    //         nombre: "Blas Herrera",
    //         profesion: "Ingeniero",
    //         edad: 40
    //     }
    // });


    const resultado = await Plantilla.findByIdAndUpdate(id, {
        $set: {
            nombre: "Blas Herrera",
            profesion: "Ingeniero",
            edad: 40
        }
    }, {new: true});
    console.log(resultado);
}

//actualizaPlantilla('62cc9bdbbb05f12861fe36f2');

async function eliminaPlantilla(id) {
    const resultado = await Plantilla.deleteOne({_id: id});
    console.log(resultado);
}

eliminaPlantilla('62cc963465df0609e0d296e9');

listarPlantilla();