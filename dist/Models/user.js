"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
exports.UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: String,
    password: String,
    picture: String,
    isSeller: {
        type: Boolean,
        default: false
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
});
exports.UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password"))
        return next();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });
});
exports.UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
exports.default = mongoose.model("User", exports.UserSchema);
//# sourceMappingURL=user.js.map