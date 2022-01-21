"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckJwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const config = require('../config');
let CheckJwtMiddleware = class CheckJwtMiddleware {
    use(req, res, next) {
        let token = req.headers["authorization"];
        if (token) {
            jsonwebtoken_1.default.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'Failed to authenticate token'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'No token provided'
            });
        }
    }
};
CheckJwtMiddleware = __decorate([
    (0, common_1.Injectable)()
], CheckJwtMiddleware);
exports.CheckJwtMiddleware = CheckJwtMiddleware;
//# sourceMappingURL=check-jwt.middleware.js.map