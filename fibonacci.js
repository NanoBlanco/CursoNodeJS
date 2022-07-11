const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const crearSerie = (cantidad) => {

    return new Promise((resolve, rejects) => {

        let var1 = 1;
        let var2 = 1;
        let data = '';
        
        data += `${var1}\t`;
        
        for (let i=2; i<=cantidad; i++) {
            data += `${var2}\t`;
            var2 = var1 + var2;
            var1 = var2 - var1;
        }
        
        fs.writeFile('fibo.txt', data, (err) => {
            if (err) 
                rejects('Error creando archivo');
            else 
                resolve('El archivo fue creado!');
        });
    });
}
    
module.exports = {
    crearSerie
}