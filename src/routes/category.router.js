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
		asyncHandler((req, res) => {
			controller.getCategoryByID(req, res);
		})
	);

	// ========== CREATE CATEGORY ==========
	router.post(
		"/",
		processCategoryImage,
		validateCreateCategory,
		asyncHandler((req, res) => {
			controller.createCategory(req, res);
		})
	);

	// ========== UPDATE CATEGORY ==========
	router.put(
		"/:id",
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
		asyncHandler((req, res) => {
			controller.softDeleteCategory(req, res);
		})
	);

	// ========== HARD DELETE CATEGORY ==========
	router.delete(
		"/:id/hard",
		validateIDParam,
		handleValidationErrors,
		asyncHandler((req, res) => {
			controller.hardDeleteCategory(req, res);
		})
	);

	// ========== ACTIVATE CATEGORY ==========
	router.patch(
		"/:id/activate",
		validateIDParam,
		handleValidationErrors,
		asyncHandler((req, res) => {
			controller.activateCategory(req, res);
		})
	);

	// ========== SEARCH CATEGORIES ==========
	router.get(
		"/search/:term",
		validateSearchCategories,
		asyncHandler((req, res) => {
			controller.searchCategories(req, res);
		})
	);

	// ========== GET CATEGORY COUNT ==========
	router.get(
		"/stats/count",
		validateIncludeInactiveParam,
		handleValidationErrors,
		asyncHandler((req, res) => {
			controller.getCategoryCount(req, res);
		})
	);

	return router;
};
