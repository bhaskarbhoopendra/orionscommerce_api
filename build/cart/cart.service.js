"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("./cart.model"));
class CartService {
    constructor() {
        this.cart = cart_model_1.default;
        this.cartItem = async () => {
            const carts = await this.cart.find().populate({
                path: "items.productId",
                select: " price total",
            });
            return carts[0];
        };
        this.addTocart = async (cart, productDetails, productId, quantity) => {
            if (cart) {
                const productIdExistInCart = (item) => {
                    item.productId._id == productId;
                };
                const productFoundIndex = cart.items.findIndex(productIdExistInCart);
                console.log({ productFoundIndex });
                // if product exists
                if (productFoundIndex !== -1) {
                    console.log("No erro");
                    cart.items[productFoundIndex].quantity =
                        cart.items[productFoundIndex].quantity + quantity;
                    cart.items[productFoundIndex].total =
                        cart.items[productFoundIndex].quantity * productDetails.price;
                    cart.items[productFoundIndex].price = productDetails.price;
                }
                else if (quantity > 0) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: productDetails.price * quantity,
                    });
                    cart.subTotal = cart.items
                        .map((item) => item.total)
                        .reduce((acc, next) => acc + next);
                }
                else {
                    return "Invalid Request";
                }
                let data = await cart.save();
                console.log({ data });
                return data;
            }
            else {
                const updatedCart = {
                    items: [
                        {
                            productId: productId,
                            quantity: quantity,
                            price: productDetails.price,
                            total: productDetails.price * quantity,
                        },
                    ],
                    subTotal: productDetails.price * quantity,
                };
                // console.log(updatedCart);
                const newCartData = new this.cart(Object.assign({}, updatedCart));
                console.log(newCartData);
                return newCartData;
            }
        };
    }
}
exports.default = CartService;
