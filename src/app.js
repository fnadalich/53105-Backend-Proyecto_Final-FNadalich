// Desafio 3 - implementación de Express JS

const express = require ("express");
const app = express ();
const PORT = 8080;
const ProductManager = require ("./controllers/ProductManager.js");
const productManager = new ProductManager("./src/models/products.json");

//Middleware (visto en el after)
app.use(express.json());

//Rutas
//Listar poductos del archivo json

app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos)
        }
    } catch (error) {
        res.status(500).json({error: "Interal error"})
    }
})

// Retornar producto por ID: 

app.get("/products/:pid", async (req, res) => {
    try {
        let id = req.params.pid;
        const producto = await productManager.getProductById(parseInt(id));

        if(!producto) {
            return res.json({error: "ID not found"});
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({error: "Interal error"})
    }
})


//Listen del servidor

app.listen(PORT, ()=>{
    console.log (`Listening to port ${PORT}`);

})