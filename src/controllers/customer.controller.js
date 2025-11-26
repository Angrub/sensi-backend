import { CustomerService } from "../services/index.js";
import { NotFoundError } from "../middlewares/index.js";

export class CustomerController {
	/**
	 *
	 * @param {CustomerService} service
	 */
	constructor(service) {
		this.service = service;
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getAllCategories(req, res) {
		const categories = await this.service.getAllCategories();

		res.json({
			success: true,
			data: categories,
			count: categories.length,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getModulars(req, res) {
		const modulars = await this.service.getAllModulars();

		res.json({
			success: true,
			data: modulars,
			count: modulars.length,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async getProductsByCategory(req, res) {
		const { category } = req.params;
		const products = await this.service.getProductsByCategory(category);

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
	async getProductBySKU(req, res) {
		const { sku } = req.params;
		const product = await this.service.getProductBySKU(sku);

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
	async getModularSet(req, res) {
		const { category } = req.params;
		const product = await this.service.getModularSet(category);

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		res.json({
			success: true,
			data: product,
		});
	}
}
