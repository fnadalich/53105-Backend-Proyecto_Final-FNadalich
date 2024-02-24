const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");

//List all the products. 
router.get("/", async (req, res) => {   
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error("Error getting products", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

//To search a product by ID: 

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const product = await productManager.getProductById(parseInt(id));
        if (!product) {
            return res.json({
                error: "Product not found"
            });
        }

        res.json(product);
    } catch (error) {
        console.error("Error getting product", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});


//To add a new product: 

router.post("/", async (req, res) => {
    const newProduct = req.body;

    try {
        await productManager.addProduct(newProduct);
        res.status(201).json({
            message: "Product successfully added"
        });
    } catch (error) {
        console.error("Error adding product", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

//To update a product by its ID
router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const updatedProduct = req.body;

    try {
        await productManager.updateProduct(parseInt(id), updatedProduct);
        res.json({
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error("Error updating product", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

//To delete a product: 

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Product successfully removed"
        });
    } catch (error) {
        console.error("Error while deleting product", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;