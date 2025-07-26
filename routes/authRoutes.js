const express = require("express");

const { signUp, login } = require("../controllers/authController");
const Route = require("./productRoutes");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

module.exports = Route;