import { Router } from "express"

const express = require("express")
const authController = require("../controllers/authController")
const validators = require("../middlewares/validators")
const router: Router = express.Router()

router
  .route("/register")
  .post(validators.validateUser, authController.registerUser)

router
  .route("/sign-in")
  .post(validators.validateUser, authController.signInUser)

router.route("/recover-password").post(authController.recoverPassword)

router.route("/reset-password").post(authController.resetPassword)

module.exports = router
