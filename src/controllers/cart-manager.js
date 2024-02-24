const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;
        // Load carts stored in the file
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                //Verify if one cart is already created
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
                //Use the map method to create a new array wich has the cart identifiers
                //With Math.max I get the maximum ID.
            }
        } catch (error) {
            console.error("Error loading carts from file", error);
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        };

        this.carts.push(newCart);

        await this.saveCarts();
        return newCart;
    }

    async getCartById(cartId) {
        try {
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                throw new Error(`There is no cart with the id ${cartId}`);
            }

            return cart;
        } catch (error) {
            console.error("Error getting cart by ID", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        const existProduct = cart.products.find(p => p.product === productId);

        if (existProduct) {
            existProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await this.saveCarts();
        return cart;
    }
}

module.exports = CartManager;