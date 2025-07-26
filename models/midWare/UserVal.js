const { check, body } = require("express-validator");
const slugify = require("slugify");
const User = require("../../models/userModel");
const validationM = require("./Valm");

const createUser = [
  check("name")
    .notEmpty()
    .withMessage("Enter name")
    .isLength({ min: 2, max: 20 })
    .withMessage("Name must be between 2 and 20 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Enter email")
    .isEmail()
    .withMessage("Enter a valid email")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),
//hello 
  check("password")
    .notEmpty()
    .withMessage("Enter password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("cPassword")
    .notEmpty()
    .withMessage("Enter confirm password")
    .custom((cPassword, { req }) => {
      if (cPassword !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
  validationM
];

module.exports = { createUser };