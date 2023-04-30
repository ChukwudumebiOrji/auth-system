"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator = require("validator");
const validateUser = (req, res, next) => {
    const { fullName, email, password } = req.body;
    const names = fullName.split(" ");
    names.forEach((name) => {
        if (!validator.isAlpha(name)) {
            throw new Error("Name is not valid");
        }
    });
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    res.locals.user = { fullName, email, password };
    next();
};
module.exports = { validateUser };
