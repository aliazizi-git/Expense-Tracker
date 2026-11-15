import { body, param, query } from "express-validator";
import handleValidation from "../../Utils/handleValidation.js";

export const createExpenseValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID format"),

  body("cost")
    .notEmpty()
    .withMessage("Cost is required")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a positive number"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date format"),

  handleValidation,
];

export const updateExpenseValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid expense ID format"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID format"),

  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost must be a positive number"),

  body("date")
    .optional()
    .isDate()
    .withMessage("Date must be a valid date format"),

  handleValidation,
];

export const deleteExpenseValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid expense ID format"),

  handleValidation,
];

export const summaryExpenseValidator = [
  query("month")
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be an integer between 1 and 12"),

  query("year")
    .optional()
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Year must be a valid 4-digit year"),

  handleValidation,
];