import { Router } from "express";
import { Model } from "sequelize";

import {
	asyncHandler,
	validateIDParam,
	handleValidationErrors,
} from "../middlewares/index.js";
import { CustomerService } from "../services/index.js";
import { CustomerController } from "../controllers/index.js";

/**
 *
 * @param {Model} categoryModel
 * @param {Model} productModel
 * @param {Model} ProductImageModel
 * @returns {Router}
 */
export const createCustomerRouter = (
	categoryModel,
	productModel,
	ProductImageModel
) => {
	const router = Router();
	const service = new CustomerService(
		categoryModel,
		productModel,
		ProductImageModel
	);
	const controller = new CustomerController(service);

	// ========== GET ALL CATEGORIES ==========
	router.get(
		"/categories",
		asyncHandler(controller.getAllCategories.bind(controller))
	);

	// ========== GET ALL CATEGORIES ==========
	router.get(
		"/modulars",
		asyncHandler(controller.getModulars.bind(controller))
	);

	// ========== GET PRODUCTS BY CATEGORY ==========
	router.get(
		"/categories/:category/products",
		asyncHandler(controller.getProductsByCategory.bind(controller))
	);

	// ========== GET PRODUCT BY ID ==========
	router.get(
		"/products/:sku",
		asyncHandler(controller.getProductBySKU.bind(controller))
	);

	return router;
};
