"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    rating: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model("Review", ReviewSchema);
//# sourceMappingURL=review.js.map