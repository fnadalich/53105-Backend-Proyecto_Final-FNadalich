const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Métodos: 

    async addProduct(nuevoObjeto) {
        let {
            title,
            description,
            price,
            img,
            code,
            stock
        } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("All fields are required");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("The code already exists");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }


        this.products.push(newProduct);

        //Guardamos el array en el archivo: 

        await this.guardarArchivo(this.products);

    }

    async getProducts() {
        try {
            //Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.

            const arrayProductos = this.leerArchivo();
            return arrayProductos;
        } catch (error) {
            console.log("Error reading the file ", error);
        }

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Product not found");
            } else {
                console.log("Found product");
                return buscado;
            }

        } catch (error) {
            console.log("Error reading the file ", error);
        }

    }

    //Nuevos metodos desafio 2: 

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Error reading the file ", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error saving the file", error);
        }
    }

    //Actualizamos algun producto:
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                //Puedo usar el método de array splice para reemplazar el objeto en la posicion del index: 
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("Product not found");
            }

        } catch (error) {
            console.log("Error updating the product", error);
        }
    }

}


module.exports = ProductManager;