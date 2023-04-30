"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = void 0;
const jwt = require("jsonwebtoken");
const signJWT = (payload, key, options) => {
    const jwt_token = jwt.encode(payload, key, options);
    return jwt_token;
};
exports.signJWT = signJWT;
