import { body, param } from "express-validator";
import handleValidation from "../../Utils/handleValidation.js";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 50 })
    .withMessage("Category name cannot exceed 50 characters"),

  body("color")
    .optional()
    .trim()
    .isString()
    .withMessage("Color must be a string"),

  body("icon")
    .optional()
    .trim()
    .isString()
    .withMessage("Icon must be a string"),

  handleValidation,
];

export const updateCategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid category ID format"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Category name cannot exceed 50 characters"),

  body("color")
    .optional()
    .trim()
    .isString()
    .withMessage("Color must be a string"),

  body("icon")
    .optional()
    .trim()
    .isString()
    .withMessage("Icon must be a string"),

  handleValidation,
];

export const deleteCategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid category ID format"),

  handleValidation,
];