const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }

    ],
});

const Cart = mongoose.model("Cart", cartSchema);
const Product = mongoose.model("Product", productSchema);
module.exports = { Cart, Product };