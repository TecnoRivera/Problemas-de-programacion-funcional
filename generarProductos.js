const fs = require('fs');

function generarProducto() {
    const clave = Math.floor(Math.random() * 1000);
    const descripcion = `Producto ${clave}`;
    const precio = (Math.random() * (100 - 1) + 1).toFixed(2);
    const clasificacion = Math.floor(Math.random() * 5);
    const cantidadE = Math.floor(Math.random() * 100);
    const existenciaMin = Math.floor(Math.random() * 30);
    const existenciaMax = existenciaMin + Math.floor(Math.random() * (100-existenciaMin));
    
    return `${clave},${descripcion},${precio},${clasificacion},${cantidadE},${existenciaMin},${existenciaMax}`;
}

const productos = Array.from({ length:80 }, () => generarProducto());

fs.writeFileSync('productos.txt',productos.join('\n'),'utf8');