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
	router.get("/", validateGetAllProducts, async (req, res) => {
		controller.getAllProducts(req, res);
	});

	// ========== GET PRODUCT BY ID ==========
	router.get("/:id", validateGetProductById, async (req, res) => {
		controller.getProductByID(req, res);
	});

	// ========== GET PRODUCT BY SKU ==========
	router.get("/sku/:sku", validateGetProductBySKU, async (req, res) => {
		controller.getProductBySKU(req, res);
	});

	// ========== CREATE PRODUCT ==========
	router.post("/", validateCreateProduct, async (req, res) => {
		controller.createProduct(req, res);
	});

	// ========== UPDATE PRODUCT ==========
	router.put("/:id", validateUpdateProduct, async (req, res) => {
		controller.updateProduct(req, res);
	});

	// ========== UPDATE PRODUCT STOCK ==========
	router.patch("/:id/stock", validateUpdateProductStock, async (req, res) => {
		controller.updateProductStock(req, res);
	});

	// ========== DELETE PRODUCT (SOFT DELETE) ==========
	router.delete(
		"/:id",
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.softDeleteProduct(req, res);
		}
	);

	// ========== HARD DELETE PRODUCT ==========
	router.delete(
		"/:id/hard",
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.hardDeleteProduct(req, res);
		}
	);

	// ========== ACTIVATE PRODUCT ==========
	router.patch(
		"/:id/activate",
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.activateProduct(req, res);
		}
	);

	// ========== SEARCH PRODUCTS ==========
	router.get("/search/:term", validateSearchProducts, async (req, res) => {
		controller.searchProduct(req, res);
	});

	// ========== GET PRODUCT COUNT ==========
	router.get(
		"/stats/count",
		validateIncludeInactiveParam,
		handleValidationErrors,
		async (req, res) => {
			controller.getProductCount(req, res);
		}
	);

	// ========== ADD PRODUCT IMAGE ==========
	router.post(
		"/:id/images",
		processProductsImages,
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.addProductImage(req, res);
		}
	);

	// ========== GET PRODUCT IMAGES ==========
	router.get(
		"/:id/images",
		validateIDParam,
		validateIncludeInactiveParam,
		handleValidationErrors,
		async (req, res) => {
			controller.getProductImages(req, res);
		}
	);

	// ========== DELETE PRODUCT IMAGE (SOFT) ==========
	router.delete(
		"/images/:id",
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.softDeleteProductImage(req, res);
		}
	);

	// ========== HARD DELETE PRODUCT IMAGE ==========
	router.delete(
		"/images/:id/hard",
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.hardDeleteProductImage(req, res);
		}
	);

	// ========== ACTIVATE PRODUCT IMAGE ==========
	router.patch(
		"/images/:id/activate",
		validateIDParam,
		handleValidationErrors,
		async (req, res) => {
			controller.activateProductImage(req, res);
		}
	);

	return router;
};
