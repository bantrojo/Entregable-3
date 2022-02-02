const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;

    }

    create() {
        fs.writeFileSync(this.nombreArchivo, '{"productos":[]}');

    }
    save(newProduct) {
        let arr = [];

        try {
            let data = fs.readFileSync(this.nombreArchivo, 'utf-8');
            arr = JSON.parse(data).productos;
            let posicion;
            if (arr.length > 0) {

                posicion = arr.length + 1;
            } else {
                posicion = 1;
            }
            const nuevoProducto = { ...newProduct, id: posicion };
            arr.push(nuevoProducto);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify({ productos: arr }))
        } catch (error) {
            console.log(error);
        }
    }

    getById(numero) {
        let i;

        let data = fs.readFileSync(this.nombreArchivo, 'utf-8');

        try {
            for (i = 0; i < numero; i++) {
                if (JSON.parse(data).productos[i].id == numero) {
                    console.log(JSON.parse(data).productos[i])
                }
            }
        } catch (error) {
            console.log(`no se pudo cargar el producto ${numero}`);

        }

    }
    getAll() {

        try {
            let data = fs.readFileSync(this.nombreArchivo, 'utf-8');
            console.log(JSON.parse(data).productos);

        } catch (error) {
            console.log('no se pudo cargar el archivo');
        }
    }

    async deleteAll() {
        try {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await fs.unlinkSync(this.nombreArchivo)
            console.log('Se elimino el archivo');
        } catch (error) {
            console.log('No se pudo eliminar el archivo');
        }
    }

    borrar(numeroAEliminar) {
        let data = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let datapar = JSON.parse(data);
        try {
            let i;
            for (i = 0; i < datapar.productos.length; i++) {
                if (datapar.productos[i].id == numeroAEliminar) {
                    datapar.productos.splice(i, 1);
                    console.log(datapar);
                }
            }
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(datapar));
        } catch (error) { console.log(`no se pudo eliminar el producto ${numeroAEliminar}`); }

    }

}
const cont1 = new Contenedor('tp.json');
cont1.create();

cont1.save({ nombre: "pespi", precio: 5000 });
cont1.save({ nombre: "moster", precio: 200 });
cont1.save({ nombre: "moster verde", precio: 200 });
/*
console.log('------------------------');
console.log('Mostrar los productos por id');
cont1.getById(1);
cont1.getById(3);
cont1.getById(5);
console.log('------------------------');
console.log('Mostrar todos los productos');
cont1.getAll();
console.log('Se borran algunos archivos:')

cont1.deleteAll();
cont1.borrar(1);
cont1.borrar(2);
*/


const express = require('express');
const app = express();


app.get('/Productos', (req, res) => {
    fs.readFile('./tp.json', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    }
    )
})


app.get('/Random',(req,res)=>{
    fs.readFile('./tp.json',(err,data)=>{
        try{
            const random = JSON.parse(data).productos[Math.floor(Math.random() * JSON.parse(data).productos.length)];
            res.send(random);
        }catch(err){
            throw err;
        }
    })
})


const connectedServer = app.listen(8080, () => {
    console.log('Listening on port 8080');
})
