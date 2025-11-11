import { ProductService } from "../services/index.js";
import { ConflictError, NotFoundError, ValidationError } from "../middlewares/index.js";

export class ProductController {
	/**
	 *
	 * @param {ProductService} service
	 */
	constructor(service) {
		this.service = service;
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getAllProducts(req, res) {
		const {
			includeInactive = false,
			includeImages = false,
			limit,
			offset,
			orderBy = "title",
			orderDirection = "ASC",
		} = req.query;

		const products = await this.service.getAll({
			includeInactive,
			includeImages,
			limit,
			offset,
			orderBy,
			orderDirection,
		});

		res.json({
			success: true,
			data: products,
			count: products.length,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getProductByID(req, res) {
		const { id } = req.params;
		const { includeInactive = false, includeImages = false } = req.query;

		const product = await this.service.getById(id, {
			includeInactive,
			includeImages,
		});

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		res.json({
			success: true,
			data: product,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getProductBySKU(req, res) {
		const { sku } = req.params;
		const { includeInactive = false } = req.query;

		const product = await this.service.getBySku(sku, {
			includeInactive,
		});

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		res.json({
			success: true,
			data: product,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async createProduct(req, res) {
		const productData = req.body;

		// Verificar si ya existe un producto con el mismo SKU
		const existingProduct = await this.service.getBySku(productData.sku);
		if (existingProduct) {
			throw new ConflictError("A product with this SKU already exists");
		}

		const product = await this.service.create(productData);

		res.status(201).json({
			success: true,
			message: "Product created successfully",
			data: product,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async updateProduct(req, res) {
		const { id } = req.params;
		const updateData = req.body;

		// Si se está actualizando el SKU, verificar que no exista otro con el mismo SKU
		if (updateData.sku) {
			const productWithSameSku = await this.service.getBySku(
				updateData.sku
			);
			if (productWithSameSku && productWithSameSku.id !== id) {
				throw new ConflictError(
					"A product with this SKU already exists"
				);
			}
		}

		const updatedProduct = await this.service.update(id, updateData);

		res.json({
			success: true,
			message: "Product updated successfully",
			data: updatedProduct,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async updateProductStock(req, res) {
		const { id } = req.params;
		const { stock } = req.body;

		const updatedProduct = await this.service.updateStock(id, stock);

		res.json({
			success: true,
			message: "Product stock updated successfully",
			data: updatedProduct,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async softDeleteProduct(req, res) {
		const { id } = req.params;

		await this.service.softDelete(id);

		res.json({
			success: true,
			message: "Product deleted successfully",
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async hardDeleteProduct(req, res) {
		const { id } = req.params;

		await this.service.hardDelete(id);

		res.json({
			success: true,
			message: "Product permanently deleted",
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async activateProduct(req, res) {
		const { id } = req.params;

		const activatedProduct = await this.service.activate(id);

		res.json({
			success: true,
			message: "Product activated successfully",
			data: activatedProduct,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async searchProduct(req, res) {
		const { term } = req.params;
		const { includeInactive = false, limit = 10 } = req.query;

		const products = await this.service.search(term, {
			includeInactive,
			limit,
		});

		res.json({
			success: true,
			data: products,
			count: products.length,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getProductCount(req, res) {
		const { includeInactive = false } = req.query;

		const count = await this.service.count({ includeInactive });

		res.json({
			success: true,
			data: { count },
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async addProductImage(req, res) {
		const { id } = req.params;
		const imagesData = req.body.images;

		// Verificar si el producto existe
		const product = await this.service.getById(id, {
			includeInactive: true,
		});
		if (!product) {
			throw new NotFoundError("Product not found");
		}

		const image = await this.service.addImages(id, imagesData);

		res.status(201).json({
			success: true,
			message: "Product image added successfully",
			data: image,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getProductImages(req, res) {
		const { id } = req.params;
		const { includeInactive = false } = req.query;

		// Verificar si el producto existe
		const product = await this.service.getById(id, {
			includeInactive: true,
		});
		if (!product) {
			throw new NotFoundError("Product not found");
		}

		const images = await this.service.getProductImages(id, {
			includeInactive,
		});

		res.json({
			success: true,
			data: images,
			count: images.length,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async softDeleteProductImage(req, res) {
		const { id } = req.params;

		await this.service.softDeleteImage(id);

		res.json({
			success: true,
			message: "Product image deleted successfully",
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async hardDeleteProductImage(req, res) {
		const { id } = req.params;

		await this.service.hardDeleteImage(id);

		res.json({
			success: true,
			message: "Product image permanently deleted",
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async activateProductImage(req, res) {
		const { id } = req.params;

		const activatedImage = await this.service.activateImage(id);

		res.json({
			success: true,
			message: "Product image activated successfully",
			data: activatedImage,
		});
	}
}
