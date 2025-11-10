import { Router } from "express";
import { Model } from "sequelize";

import {
	asyncHandler,
	handleValidationErrors,
	processCategoryImage,
	validateCreateCategory,
	validateGetAllCategories,
	validateIDParam,
	validateIncludeInactiveParam,
	validateSearchCategories,
	validateUpdateCategory,
} from "../middlewares/index.js";
import { CategoryService } from "../services/index.js";
import { CategoryController } from "../controllers/index.js";

/**
 *
 * @param {Model} model
 * @returns {Router}
 */
export const createCategoryRouter = (model) => {
	const router = Router();
	const service = new CategoryService(model);
	const controller = new CategoryController(service);

	// ========== GET ALL CATEGORIES ==========
	router.get(
		"/",
		validateGetAllCategories,
		asyncHandler((req, res) => {
			controller.getAllCategories(req, res);
		})
	);

	// ========== GET CATEGORY BY ID ==========
	router.get(
		"/:id",
		validateIDParam,
		validateIncludeInactiveParam,
		handleValidationErrors,
		asyncHandler(controller.getCategoryByID.bind(controller))
	);

	// ========== CREATE CATEGORY ==========
	router.post(
		"/",
		processCategoryImage(),
		validateCreateCategory,
		asyncHandler(controller.createCategory.bind(controller))
	);

	// ========== UPDATE CATEGORY ==========
	router.put(
		"/:id",
		processCategoryImage(true),
		validateUpdateCategory,
		asyncHandler((req, res) => {
			controller.updateCategory(req, res);
		})
	);

	// ========== DELETE CATEGORY (SOFT DELETE) ==========
	router.delete(
		"/:id",
		validateIDParam,
		handleValidationErrors,
		asyncHandler(controller.softDeleteCategory.bind(controller))
	);

	// ========== HARD DELETE CATEGORY ==========
	router.delete(
		"/:id/hard",
		validateIDParam,
		handleValidationErrors,
		asyncHandler(controller.hardDeleteCategory.bind(controller))
	);

	// ========== ACTIVATE CATEGORY ==========
	router.patch(
		"/:id/activate",
		validateIDParam,
		handleValidationErrors,
		asyncHandler(controller.activateCategory.bind(controller))
	);

	// ========== SEARCH CATEGORIES ==========
	router.get(
		"/search/:term",
		validateSearchCategories,
		asyncHandler(controller.searchCategories.bind(controller))
	);

	// ========== GET CATEGORY COUNT ==========
	router.get(
		"/stats/count",
		validateIncludeInactiveParam,
		handleValidationErrors,
		asyncHandler(controller.getCategoryCount.bind(controller))
	);

	return router;
};
