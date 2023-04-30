"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    res.send(err.message);
};
module.exports = errorHandler;
