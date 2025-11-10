import { CategoryService } from "../services/index.js";
import { NotFoundError } from "../middlewares/index.js";

export class CategoryController {
	/**
	 *
	 * @param {CategoryService} service
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
		const {
			includeInactive = false,
			limit,
			offset,
			orderBy = "title",
			orderDirection = "ASC",
		} = req.query;

		const categories = await this.service.getAll({
			includeInactive,
			limit,
			offset,
			orderBy,
			orderDirection,
		});

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
	async getCategoryByID(req, res) {
		const { id } = req.params;
		const { includeInactive = false } = req.query;

		const category = await this.service.getById(id, {
			includeInactive,
		});

		if (!category) {
			throw new NotFoundError("Category not found");
		}

		res.json({
			success: true,
			data: category,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async createCategory(req, res) {
		const categoryData = req.body;

		const category = await this.service.create(categoryData);

		res.status(201).json({
			success: true,
			message: "Category created successfully",
			data: category,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async updateCategory(req, res) {
		const { id } = req.params;
		const updateData = req.body;

		const updatedCategory = await this.service.update(id, updateData);

		res.json({
			success: true,
			message: "Category updated successfully",
			data: updatedCategory,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async softDeleteCategory(req, res) {
		const { id } = req.params;

		await this.service.softDelete(id);

		res.json({
			success: true,
			message: "Category deleted successfully",
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async hardDeleteCategory(req, res) {
		const { id } = req.params;

		await this.service.hardDelete(id);

		res.json({
			success: true,
			message: "Category permanently deleted",
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async activateCategory(req, res) {
		const { id } = req.params;

		const activatedCategory = await this.service.activate(id);

		res.json({
			success: true,
			message: "Category activated successfully",
			data: activatedCategory,
		});
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async searchCategories(req, res) {
		const { term } = req.params;
		const { includeInactive = false, limit = 10 } = req.query;

		const categories = await this.service.search(term, {
			includeInactive,
			limit,
		});

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
	async getCategoryCount(req, res) {
		const { includeInactive = false } = req.query;

		const count = await this.service.count({ includeInactive });

		res.json({
			success: true,
			data: { count },
		});
	}
}
