const ProductModel = require("../models/product.model.js");


class ProductManager {

  async addProduct({ title, description, price, img, code, stock, category, thumbnail }) {
    try {

      if (!title || !description || !price || !code || !stock || !category) {
        console.log("All fields are required");
        return;
      }

      const productExist = await ProductModel.findOne({ code: code })
      if (productExist) {
        console.log("The code almost exists")
        return;
      }

      const newProduct = new ProductModel(
        {
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnail: thumbnail || []
      });

      await newProduct.save();

    } catch (error) {
      console.log("Error adding product", error);
      throw error;
    }
  }
  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.log("Error getting products", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product found");
        return product;
      }
    } catch (error) {
      console.log("Error finding product by id", error);
      throw error;
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const upDateProduct = await ProductModel.findByIdAndUpdate(id, productoActualizado);

      if (!upDateProduct) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product updated");
        return upDateProductproduct;
      }

    } catch (error) {
      console.log("Error updating the product", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("Product not found");
        return null;
      }
      console.log("Product deleted");

    } catch (error) {
      console.log("Error deleting the product", error);
      throw error;
    }
  }
}


module.exports = ProductManager