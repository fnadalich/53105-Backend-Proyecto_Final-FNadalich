// Preentrega 1 BACKEND

const express = require ("express");
const app = express ();
const PORT = 8080;
const productsRouter = require ("./routes/products.router.js");
const cartsRouter = require ("./routes/carts.router.js")

//Middlewares
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Server listening
app.listen(PORT, ()=>{
    console.log (`Listening to port ${PORT}`);
})