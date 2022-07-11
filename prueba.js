// Funciones flecha

const años = [2000, 2008, 2003];
let edad = años.map(as => 2019 - as);
console.log(edad);

//Funciones Callback


// Promesas
const loquesea = new Promise((resolve, reject ) => {
    setTimeout(() => {
        if (false)
            resolve('Todo ok');
        else
            reject('No ok');
    }, 3000);
});

loquesea
        .then(msj => {
            console.log(msj);
        })
        .catch( error => {
            console.log(error);
        });

// Async / Await
function mensaje() {
    return new Promise((resolve, reject ) => {
        setTimeout(() => {
            if (true)
                resolve('Todo ok');
            else
                reject('No ok');
        }, 3000);
    });
}

async function llamada() {
    console.log('Llamada...');
    const respuesta = await mensaje();
    return respuesta;
}

llamada().then(m =>console.log(m)).catch(e =>console.log(e));
