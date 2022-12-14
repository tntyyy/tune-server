const Router = require("express");
const router = new Router();
const usersController = require("../controllers/usersController");
const {check, body} = require("express-validator");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/registration", [
    check("username", "The username cannot be empty").notEmpty(),
    check("username", "The username must contain more than 4 characters, but less than 20.").isLength({min: 4, max: 20}),
    check("email", "Incorrect email").isEmail(),
    body("email").isEmail(),
    check("password", "The password cannot be empty").notEmpty(),
    check("password", "The password must contain more than 6 characters, but less than 20.").isLength({min: 6, max: 20}),
    check("role", "The role cannot be empty").notEmpty()
], usersController.registration);
router.post("/login", [
  check("email", "The username cannot be empty").notEmpty(),
  check("password", "The password cannot be empty").notEmpty(),
], usersController.login);
router.get("/auth", authMiddleware, usersController.auth);

module.exports = router;