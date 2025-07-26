const express = require("express");
const { CreateUser, getUserById } = require("../controllers/userController");

const Route = express.Router();

Route.post("/", CreateUser);
Route.get("/:id", getUserById);

module.exports = Route;
