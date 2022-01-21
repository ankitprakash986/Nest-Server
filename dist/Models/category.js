"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});
//# sourceMappingURL=category.js.map