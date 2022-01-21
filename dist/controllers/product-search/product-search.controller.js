"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSearchController = void 0;
const common_1 = require("@nestjs/common");
const async_1 = require("async");
const mongoose_1 = require("@nestjs/mongoose");
const Product = require('../../Models/product');
let ProductSearchController = class ProductSearchController {
    constructor(Category, User) {
        this.Category = Category;
        this.User = User;
    }
    fun(req, res, next) {
        const perPage = 10;
        const page = req.query.page;
        console.log(req.query.query);
        var regex = new RegExp([req.query.query].join(""), "i");
        console.log(regex);
        async_1.async.parallel([
            function (callback) {
                Product.count({}, (err, count) => {
                    var totalProducts = count;
                    callback(err, totalProducts);
                });
            },
            function (callback) {
                Product.find({
                    isDeleted: false,
                    title: regex
                })
                    .skip(perPage * page)
                    .limit(perPage)
                    .populate("category")
                    .populate("owner")
                    .exec((err, products) => {
                    if (err)
                        return next(err);
                    callback(err, products);
                });
            },
        ], function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            res.json({
                success: true,
                message: "Product",
                products: products,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage),
                currentProducts: products.length,
            });
        });
    }
    getCategories(req, res, next) {
        return this.Category.findById('5eae0460a0b6c82c10b7dbe7').exec();
        this.Category.find({}, (err, categories) => {
            console.log(categories);
            res.json({
                success: true,
                message: "Success",
                categories: categories,
            });
            if (err) {
                console.log(err);
            }
        });
    }
};
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductSearchController.prototype, "fun", null);
__decorate([
    (0, common_1.Get)('/categories'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductSearchController.prototype, "getCategories", null);
ProductSearchController = __decorate([
    (0, common_1.Controller)('/api/'),
    __param(0, (0, mongoose_1.InjectModel)('Cat')),
    __param(1, (0, mongoose_1.InjectModel)('UserDetail')),
    __metadata("design:paramtypes", [Object, Object])
], ProductSearchController);
exports.ProductSearchController = ProductSearchController;
//# sourceMappingURL=product-search.controller.js.map