"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    products: [{
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
        },],
});
module.exports = mongoose.model("Order", exports.OrderSchema);
//# sourceMappingURL=order.js.map