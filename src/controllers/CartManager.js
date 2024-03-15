const CartModel =require ("../models/cart.model.js");


class CartManager {

    async crearCarrito() {
        try {
          const newCart = new CartModel({products:[]});
          await newCart.save();
          return newCart;
        } catch (error) {
          console.log ("Error creating a new cart", error)
          throw error;
        }
    }

    async getCarritoById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error(`Cart id: ${cartId} does not exist`);
            }

            return carrito;
        } catch (error) {
            console.error("Error getting the cart by id", error);
            throw error;
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
       try {
        const carrito = await this.getCarritoById(cartId);
        const existeProducto = carrito.products.find(item => item.product.toString() === productId);

        if (existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({ product: productId, quantity });
        }

        carrito.markModified("products");
        await carrito.save();
        return carrito;

       } catch (error) {
        console.error("Error adding a product to the cart", error);
        throw error;
       }
    }
}

module.exports = CartManager;