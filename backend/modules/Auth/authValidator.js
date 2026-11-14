import { body } from "express-validator";
import handleValidation from "../../Utils/handleValidation.js";

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 100 })
    .withMessage("Username cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
    ),

  body("role")
    .optional()
    .isIn(["user", "admin", "superAdmin"])
    .withMessage("Role must be user, admin, or superAdmin"),

  handleValidation,
];

export const loginValidator = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidation,
];
