const fs = require('fs');

class Abarrotes{
    constructor(clave,descripcion,precio,clasificacion,cantidadE,existenciaMin,existenciaMax){
        this.clave = clave;
        this.descripcion = descripcion;
        this.precio = precio;
        this.clasificacion = clasificacion;
        this.cantidadE = cantidadE;
        this.existenciaMin = existenciaMin;
        this.existenciaMax = existenciaMax;
    }
}

const nombreArchivo = "productos.txt"

const ProductosDAO = {
    cargar: function(){
        const datos = fs.readFileSync(nombreArchivo,'utf8').split('\n');
        return datos.map(dato => {
            const [clave,descripcion,precio,clasificacion,cantidadE,existenciaMin,existenciaMax] = dato.split(',');
            return new Abarrotes(clave,descripcion,precio,clasificacion,cantidadE,existenciaMin,existenciaMax);
        });
    },
    productosExistenciaMayor20: function(productos){
        return productos.filter(producto => producto.cantidadE > 20);
    },
    productosExistenciaMenos15: function(productos){
        return productos.filter(producto => producto.cantidadE < 15);
    },
    productosMismaClasifPrecioMayor15_50: function(productos){
        const productosFiltrados = productos.filter(producto => producto.precio > 15.50);
        const clasificaciones = new Set(productosFiltrados.map(producto => producto.clasificacion));
        return productos.filter(producto => {
            return producto.precio > 15.50 && clasificaciones.has(producto.clasificacion);
        });
    },
    productosPrecioEntre20_30y45_00: function(productos){
        return productos.filter(producto => producto.precio > 20.30 && producto.precio < 45.00);
    },
    productosAgrupadosPorClasificacion: function(productos){
        return productos.reduce((acumulador, producto) => {
            acumulador[producto.clasificacion] = (acumulador[producto.clasificacion] || 0) + 1;
            return acumulador;
        },{});
    }
};

const productos = ProductosDAO.cargar("productos.txt");
const productosExistenciaMayor20 = ProductosDAO.productosExistenciaMayor20(productos);
console.log("Numero de productos con existencia mayor a 20:", productosExistenciaMayor20.length);

const productosExistenciaMenos15 = ProductosDAO.productosExistenciaMenos15(productos);
console.log("Numero de productos con existencia menor a 15:", productosExistenciaMenos15.length);

const productosMismaClasifPrecioMayor15_50 = ProductosDAO.productosMismaClasifPrecioMayor15_50(productos);
console.log("Productos con la misma clasificacion y precio mayor a 15.50",productosMismaClasifPrecioMayor15_50);

const productosPrecioEntre20_30y45_00 = ProductosDAO.productosPrecioEntre20_30y45_00(productos);
console.log("Lista de productos con precio entre 20.30 y 45.00:",productosPrecioEntre20_30y45_00);

const productosAgrupadosPorClasificacion = ProductosDAO.productosAgrupadosPorClasificacion(productos);
console.log("Numero de productos agrupados por su clasificacion:",productosAgrupadosPorClasificacion);