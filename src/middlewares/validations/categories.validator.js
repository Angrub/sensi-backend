import { body, param, query } from "express-validator";
import { handleValidationErrors } from "./handler.middleware.js";

export const validateGetAllCategories = [
	query("includeInactive").optional().isBoolean().toBoolean(),
	query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
	query("offset").optional().isInt({ min: 0 }).toInt(),
	query("orderBy")
		.optional()
		.isIn(["title", "tag", "created_at", "updated_at"])
		.trim()
		.escape(),
	query("orderDirection").optional().isIn(["ASC", "DESC"]).toUpperCase(),
	handleValidationErrors,
];

export const validateCreateCategory = [
	body("title")
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 1, max: 100 })
		.withMessage("Title must be between 1 and 100 characters")
		.trim()
		.escape(),
	body("tag")
		.notEmpty()
		.withMessage("Tag is required")
		.isLength({ min: 1, max: 50 })
		.withMessage("Tag must be between 1 and 50 characters")
		.trim()
		.escape(),
	body("description")
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ min: 1, max: 1000 })
		.withMessage("Description must be between 1 and 1000 characters")
		.trim()
		.escape(),
	body("imageUrl")
		.notEmpty()
		.withMessage("Image URL is required")
		.isURL({
			require_protocol: true,
			require_host: true,
			require_valid_protocol: true,
			protocols: ["http", "https"],
			allow_underscores: true,
			host_whitelist: ["localhost"],
		})
		.withMessage("Invalid image URL format")
		.isLength({ max: 2000 })
		.withMessage("Image URL too long"),
	body("imagePath")
		.notEmpty()
		.withMessage("Image path is required")
		.isLength({ max: 2000 })
		.withMessage("Image path too long"),
	body("imageMimeType")
		.notEmpty()
		.withMessage("Image MIME type is required")
		.isIn([
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/webp",
			"image/svg+xml",
		])
		.withMessage("Invalid image MIME type"),

	body("imageFilename")
		.notEmpty()
		.withMessage("Image filename is required")
		.isLength({ min: 1, max: 100 })
		.withMessage("Image filename must be between 1 and 100 characters"),
	body("active").optional().isBoolean().toBoolean(),
	body("isVisibleFromNavbar").isBoolean().toBoolean(),
	body("isModularType").isBoolean().toBoolean(),
	handleValidationErrors,
];

export const validateUpdateCategory = [
	param("id").isUUID(4).withMessage("Invalid category ID format"),
	body("title")
		.optional()
		.isLength({ min: 1, max: 100 })
		.withMessage("Title must be between 1 and 100 characters")
		.trim()
		.escape(),
	body("tag")
		.optional()
		.isLength({ min: 1, max: 50 })
		.withMessage("Tag must be between 1 and 50 characters")
		.trim()
		.escape(),
	body("description")
		.optional()
		.isLength({ min: 1, max: 1000 })
		.withMessage("Description must be between 1 and 1000 characters")
		.trim()
		.escape(),
	body("imageUrl")
		.optional()
		.isURL({
			require_protocol: true,
			require_host: true,
			require_valid_protocol: true,
			protocols: ["http", "https"],
			allow_underscores: true,
			host_whitelist: ["localhost"],
		})
		.withMessage("Invalid image URL format")
		.isLength({ max: 2000 })
		.withMessage("Image URL too long"),
	body("imagePath")
		.optional()
		.notEmpty()
		.withMessage("Image path is required")
		.isLength({ max: 2000 })
		.withMessage("Image path too long"),
	body("imageMimeType")
		.optional()
		.isIn([
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/webp",
			"image/svg+xml",
		])
		.withMessage("Invalid image MIME type"),
	body("imageFilename")
		.optional()
		.isLength({ min: 1, max: 100 })
		.withMessage("Image filename must be between 1 and 100 characters"),
	body("active").optional().isBoolean().toBoolean(),
	body("isVisibleFromNavbar").optional().isBoolean().toBoolean(),
	body("isModularType").optional().isBoolean().toBoolean(),
	handleValidationErrors,
];

export const validateSearchCategories = [
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
