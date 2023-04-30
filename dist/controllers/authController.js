"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const emails_1 = require("../utils/emails");
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");
exports.registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcrypt.hashSync(res.locals.user.password, 12);
    const newUser = new userModel({
        fullName: res.locals.user.fullName,
        email: res.locals.user.email,
        password: hash,
    });
    try {
        const userExists = yield userModel
            .find({ email: res.locals.user.email })
            .exec();
        if (userExists[0])
            throw new Error("User with this email already exists");
        yield newUser.save();
        res.send(`User ${res.locals.user.email} created`);
    }
    catch (err) {
        next(err);
    }
});
exports.signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userModel
            .find({ email: res.locals.user.email })
            .exec();
        if (!response[0])
            throw new Error("email or password incorrect");
        const isPasswordMatching = bcrypt.compareSync(res.locals.user.password, response[0].password);
        if (isPasswordMatching)
            res.send(response[0]);
        else
            throw new Error("email or password incorrect");
    }
    catch (err) {
        next(err);
    }
});
exports.recoverPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validator.isEmail(req.body.email))
        throw new Error("Invalid email");
    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: req.body.email,
        subject: "Test Email",
        text: "This is a test email sent from Node.js using Nodemailer ",
    };
    // Send the email
    emails_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            next(error);
        }
        else {
            console.log("Email sent:", info.response);
            res.send("Email sent successfully");
        }
    });
});
exports.resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
