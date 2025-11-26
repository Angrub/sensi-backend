import { body, param, query } from "express-validator";
import { handleValidationErrors } from "./handler.middleware.js";

export const validateGetAllProducts = [
	query("includeInactive").optional().isBoolean().toBoolean(),
	query("includeImages").optional().isBoolean().toBoolean(),
	query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
	query("offset").optional().isInt({ min: 0 }).toInt(),
	query("orderBy")
		.optional()
		.isIn(["title", "sku", "price", "stock", "created_at", "updated_at"])
		.trim()
		.escape(),
	query("orderDirection").optional().isIn(["ASC", "DESC"]).toUpperCase(),
	handleValidationErrors,
];

export const validateGetProductById = [
	param("id").isUUID(4).withMessage("Invalid product ID format"),
	query("includeInactive").optional().isBoolean().toBoolean(),
	query("includeImages").optional().isBoolean().toBoolean(),
	handleValidationErrors,
];

export const validateGetProductBySKU = [
	param("sku")
		.notEmpty()
		.withMessage("SKU is required")
		.isLength({ min: 1, max: 50 })
		.withMessage("SKU must be between 1 and 50 characters")
		.trim()
		.escape(),
	query("includeInactive").optional().isBoolean().toBoolean(),
	handleValidationErrors,
];

export const validateCreateProduct = [
	body("title")
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 1, max: 100 })
		.withMessage("Title must be between 1 and 100 characters")
		.trim()
		.escape(),
	body("tag")
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 1, max: 100 })
		.withMessage("tag must be between 1 and 100 characters")
		.trim()
		.escape(),
	body("sku")
		.notEmpty()
		.withMessage("SKU is required")
		.isLength({ min: 1, max: 50 })
		.withMessage("SKU must be between 1 and 50 characters")
		.trim()
		.escape(),
	body("description")
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ min: 1, max: 2000 })
		.withMessage("Description must be between 1 and 2000 characters")
		.trim()
		.escape(),
	body("characteristics").optional().isArray(),
	body("price")
		.notEmpty()
		.withMessage("Price is required")
		.withMessage("Price must be a valid decimal number")
		.isFloat({ min: 0.0001, max: 9999999.9999 })
		.withMessage("Price must be between 0.0001 and 9,999,999.9999")
		.toFloat(),
	body("stock")
		.notEmpty()
		.withMessage("Stock is required")
		.isInt({ min: 0, max: 999999 })
		.withMessage("Stock must be between 0 and 999,999")
		.toInt(),
	body("categoryId").isUUID(4).withMessage("Invalid category ID format"),
	body("active").optional().isBoolean().toBoolean(),
	body("isModularSet").optional().isBoolean().toBoolean(),
	handleValidationErrors,
];

export const validateUpdateProduct = [
	param("id").isUUID(4).withMessage("Invalid product ID format"),
	body("title")
		.optional()
		.isLength({ min: 1, max: 100 })
		.withMessage("Title must be between 1 and 100 characters")
		.trim()
		.escape(),
	body("tag")
		.optional()
		.isLength({ min: 1, max: 100 })
		.withMessage("tag must be between 1 and 100 characters")
		.trim()
		.escape(),
	body("sku")
		.optional()
		.isLength({ min: 1, max: 50 })
		.withMessage("SKU must be between 1 and 50 characters")
		.trim()
		.escape(),
	body("description")
		.optional()
		.isLength({ min: 1, max: 2000 })
		.withMessage("Description must be between 1 and 2000 characters")
		.trim()
		.escape(),
	body("characteristics").optional().isArray(),
	body("price")
		.optional()
		.isFloat({ min: 0.0001, max: 9999999.9999 })
		.withMessage("Price must be between 0.0001 and 9,999,999.9999")
		.toFloat(),
	body("stock")
		.optional()
		.isInt({ min: 0, max: 999999 })
		.withMessage("Stock must be between 0 and 999,999")
		.toInt(),
	body("active").optional().isBoolean().toBoolean(),
	body("isModularSet").optional().isBoolean().toBoolean(),
	handleValidationErrors,
];

export const validateUpdateProductStock = [
	param("id").isUUID(4).withMessage("Invalid product ID format"),
	body("stock")
		.notEmpty()
		.withMessage("Stock is required")
		.isInt({ min: 0, max: 999999 })
		.withMessage("Stock must be between 0 and 999,999")
		.toInt(),
	handleValidationErrors,
];

export const validateSearchProducts = [
	param("term")
		.notEmpty()
		.withMessage("Search term is required")
		.isLength({ min: 1, max: 100 })
		.withMessage("Search term must be between 1 and 100 characters")
		.trim()
		.escape(),
	query("includeInactive").optional().isBoolean().toBoolean(),
	query("limit").optional().isInt({ min: 1, max: 50 }).toInt(),
	handleValidationErrors,
];
