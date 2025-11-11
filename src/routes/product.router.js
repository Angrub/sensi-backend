import { Router } from "express";
import { Model } from "sequelize";
import { ProductService } from "../services/index.js";
import {
	handleValidationErrors,
	processProductsImages,
	validateCreateProduct,
	validateGetAllProducts,
	validateGetProductById,
	validateGetProductBySKU,
	validateIDParam,
	validateIncludeInactiveParam,
	validateSearchProducts,
	validateUpdateProduct,
	validateUpdateProductStock,
} from "../middlewares/index.js";
import { ProductController } from "../controllers/index.js";

/**
 *
 * @param {Model} model
 * @param {Model} imageModel
 * @returns {Router}
 */
export const createProductRouter = (model, imageModel) => {
	const router = Router();
	const service = new ProductService(model, imageModel);
	const controller = new ProductController(service);

	// ========== GET ALL PRODUCTS ==========
	router.get(
		"/",
		validateGetAllProducts,
		controller.getAllProducts.bind(controller)
	);

	// ========== GET PRODUCT BY ID ==========
	router.get(
		"/:id",
		validateGetProductById,
		controller.getProductByID.bind(controller)
	);

	// ========== GET PRODUCT BY SKU ==========
	router.get(
		"/sku/:sku",
		validateGetProductBySKU,
		controller.getProductBySKU.bind(controller)
	);

	// ========== CREATE PRODUCT ==========
	router.post(
		"/",
		validateCreateProduct,
		controller.createProduct.bind(controller)
	);

	// ========== UPDATE PRODUCT ==========
	router.put(
		"/:id",
		validateUpdateProduct,
		controller.updateProduct.bind(controller)
	);

	// ========== UPDATE PRODUCT STOCK ==========
	router.patch(
		"/:id/stock",
		validateUpdateProductStock,
		controller.updateProductStock.bind(controller)
	);

	// ========== DELETE PRODUCT (SOFT DELETE) ==========
	router.delete(
		"/:id",
		validateIDParam,
		handleValidationErrors,
		controller.softDeleteProduct.bind(controller)
	);

	// ========== HARD DELETE PRODUCT ==========
	router.delete(
		"/:id/hard",
		validateIDParam,
		handleValidationErrors,
		controller.hardDeleteProduct.bind(controller)
	);

	// ========== ACTIVATE PRODUCT ==========
	router.patch(
		"/:id/activate",
		validateIDParam,
		handleValidationErrors,
		controller.activateProduct.bind(controller)
	);

	// ========== SEARCH PRODUCTS ==========
	router.get(
		"/search/:term",
		validateSearchProducts,
		controller.searchProduct.bind(controller)
	);

	// ========== GET PRODUCT COUNT ==========
	router.get(
		"/stats/count",
		validateIncludeInactiveParam,
		handleValidationErrors,
		controller.getProductCount.bind(controller)
	);

	// ========== ADD PRODUCT IMAGE ==========
	router.post(
		"/:id/images",
		processProductsImages,
		validateIDParam,
		handleValidationErrors,
		controller.addProductImage.bind(controller)
	);

	// ========== GET PRODUCT IMAGES ==========
	router.get(
		"/:id/images",
		validateIDParam,
		validateIncludeInactiveParam,
		handleValidationErrors,
		controller.getProductImages.bind(controller)
	);

	// ========== DELETE PRODUCT IMAGE (SOFT) ==========
	router.delete(
		"/images/:id",
		validateIDParam,
		handleValidationErrors,
		controller.softDeleteProductImage.bind(controller)
	);

	// ========== HARD DELETE PRODUCT IMAGE ==========
	router.delete(
		"/images/:id/hard",
		validateIDParam,
		handleValidationErrors,
		controller.hardDeleteProductImage.bind(controller)
	);

	// ========== ACTIVATE PRODUCT IMAGE ==========
	router.patch(
		"/images/:id/activate",
		validateIDParam,
		handleValidationErrors,
		controller.activateProductImage.bind(controller)
	);

	return router;
};
