import { Model } from "sequelize";

export class CustomerService {
	/**
	 * Servicio para operaciones del customer
	 * @constructor
	 * @param {import("sequelize").ModelCtor<Model>} categoryModel - Modelo de Sequelize para categorías
	 * @param {import("sequelize").ModelCtor<Model>} productModel - Modelo de Sequelize para productos
	 * @param {import("sequelize").ModelCtor<Model>} productImageModel - Modelo de Sequelize para las imagenes de productos
	 */
	constructor(categoryModel, productModel, productImageModel) {
		this.categoryModel = categoryModel;
		this.productModel = productModel;
		this.productImageModel = productImageModel;
	}

	/**
	 * Obtener todas las categorías
	 * @returns {Promise<Array<Model>>} Lista de categorías
	 */
	async getAllCategories() {
		const categories = await this.categoryModel.findAll({
			where: { active: true, isModularType: false },
		});
		return categories;
	}

	/**
	 * Obtener todos los modulares
	 * @returns {Promise<Array<Model>>} Lista de categorías
	 */
	async getAllModulars() {
		const categories = await this.categoryModel.findAll({
			where: { active: true, isModularType: true },
		});
		return categories;
	}

	/**
	 * Obtener productos por categoría
	 * @param {string} category - categoria
	 * @returns {Promise<Array<Model>>} Lista de productos
	 */
	async getProductsByCategory(category) {
		const products = await this.productModel.findAll({
			where: {
				"$category.title$": category,
				active: true,
			},
			include: [
				{
					model: this.categoryModel,
					as: "category",
					required: true,
				},
				{
					model: this.productImageModel,
					as: "images",
					where: { active: true },
					required: false,
				},
			],
		});

		return products;
	}

	/**
	 * Obtener producto por SKU
	 * @param {string} sku - SKU del producto
	 * @returns {Promise<Model|null>} Producto encontrado o null
	 */
	async getProductBySKU(sku) {
		const product = await this.productModel.findOne({
			where: { sku, active: true },
			include: [
				{
					model: this.productImageModel,
					as: "images",
					where: { active: true },
					required: false,
				},
			],
		});

		return product;
	}
}
