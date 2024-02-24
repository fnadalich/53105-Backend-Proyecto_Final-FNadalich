const fs = require("fs").promises;

class ProductManager {
  static lastId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, img, code, stock, category, status, thumbnails }) {
    try {
      const arrayProducts = await this.readFile();

      if (!title || !description || !price || !code || !stock || !category || !status || !thumbnails ) {
        console.log("All fields are required");
        return;
      }

      if (arrayProducts.some(item => item.code === code)) {
        console.log("The code already exists");
        return;
      }

      const newProduct = {
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || []
      };

      if (arrayProducts.length > 0) {
        ProductManager.lastId = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
      }

      newProduct.id = ++ProductManager.lastId; 

      arrayProducts.push(newProduct);
      await this.saveFile(arrayProducts);
    } catch (error) {
      console.log("Failed to add product", error);
      throw error; 
    }
  }
  async getProducts() {
    try {
      const arrayProducts = await this.readFile();
      return arrayProducts;
    } catch (error) {
      console.log("Error reading file", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const arrayProducts = await this.readFile();
      const searched = arrayProducts.find(item => item.id === id);

      if (!searched) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product found");
        return searched;
      }
    } catch (error) {
      console.log("Error reading file", error);
      throw error;
    }
  }

  async readFile() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const arrayProducts = JSON.parse(response);
      return arrayProducts;
    } catch (error) {
      console.log("Error reading file", error);
      throw error;
    }
  }

  async saveFile(arrayProducts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    } catch (error) {
      console.log("Error saving file", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProd) {
    try {
      const arrayProducts = await this.readFile();

      const index = arrayProducts.findIndex(item => item.id === id);

      if (index !== -1) {
        arrayProducts[index] = { ...arrayProducts[index], ...updatedProd };
        await this.saveFile(arrayProducts);
        console.log("Updated Product");
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log("Error updating product", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readFile();

      const index = arrayProducts.findIndex(item => item.id === id);

      if (index !== -1) {
        arrayProducts.splice(index, 1);
        await this.saveFile(arrayProducts);
        console.log("Product removed");
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log("Error deleting product", error);
      throw error;
    }
  }
}

module.exports = ProductManager;