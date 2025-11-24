import { unlink } from "node:fs/promises";
import { Model, Op } from "sequelize";
import { NotFoundError } from "../middlewares/index.js";

export class ProductService {
	/**
	 * Servicio para operaciones CRUD de productos
	 * @constructor
	 * @param {import("sequelize").ModelCtor<Model>} productModel - Modelo de Sequelize para productos
	 * @param {import("sequelize").ModelCtor<Model>} productImageModel - Modelo de Sequelize para imágenes de productos
	 */
	constructor(productModel, productImageModel) {
		this.productModel = productModel;
		this.productImageModel = productImageModel;
	}

	// ========== PRODUCT METHODS ==========

	/**
	 * Crear un nuevo producto
	 * @param {Object} productData - Datos del producto
	 * @param {string} productData.title - Título del producto
	 * @param {string} productData.sku - SKU único del producto
	 * @param {string} productData.description - Descripción del producto
	 * @param {object} productData.characteristics - Más información del producto
	 * @param {number} productData.price - Precio del producto
	 * @param {number} productData.stock - Stock disponible
	 * @param {boolean} [productData.active=true] - Estado activo/inactivo
	 * @returns {Promise<Model>} Producto creado
	 */
	async create(productData) {
		productData.characteristics = JSON.stringify(
			productData.characteristics
		);

		const product = await this.productModel.create(productData);
		return product;
	}

	/**
	 * Obtener producto por ID
	 * @param {string} id - UUID del producto
	 * @param {Object} [options] - Opciones de consulta
	 * @param {boolean} [options.includeInactive=false] - Incluir productos inactivos
	 * @param {boolean} [options.includeImages=false] - Incluir imágenes del producto
	 * @returns {Promise<Model|null>} Producto encontrado o null
	 */
	async getById(id, options = {}) {
		const { includeInactive = false, includeImages = false } = options;

		const where = { id };
		if (!includeInactive) {
			where.active = true;
		}

		const queryOptions = { where };

		if (includeImages) {
			queryOptions.include = [
				{
					model: this.productImageModel,
					as: "images",
					where: { active: true },
					required: false,
				},
			];
		}

		const product = await this.productModel.findOne(queryOptions);
		return product;
	}

	/**
	 * Obtener producto por SKU
	 * @param {string} sku - SKU del producto
	 * @param {Object} [options] - Opciones de consulta
	 * @param {boolean} [options.includeInactive=false] - Incluir productos inactivos
	 * @returns {Promise<Model|null>} Producto encontrado o null
	 */
	async getBySku(sku, options = {}) {
		const where = { sku };
		if (!options.includeInactive) {
			where.active = true;
		}

		const product = await this.productModel.findOne({ where });
		return product;
	}

	/**
	 * Obtener todos los productos
	 * @param {Object} [options] - Opciones de consulta
	 * @param {boolean} [options.includeInactive=false] - Incluir productos inactivos
	 * @param {boolean} [options.includeImages=false] - Incluir imágenes de productos
	 * @param {number} [options.limit] - Límite de resultados
	 * @param {number} [options.offset] - Offset para paginación
	 * @param {string} [options.orderBy='title'] - Campo para ordenar
	 * @param {string} [options.orderDirection='ASC'] - Dirección del orden (ASC/DESC)
	 * @returns {Promise<Array<Model>>} Lista de productos
	 */
	async getAll(options = {}) {
		const {
			includeInactive = false,
			includeImages = false,
			limit,
			offset,
			orderBy = "title",
			orderDirection = "ASC",
		} = options;

		const where = {};
		if (!includeInactive) {
			where.active = true;
		}

		const queryOptions = {
			where,
			order: [[orderBy, orderDirection.toUpperCase()]],
		};

		if (limit) queryOptions.limit = limit;
		if (offset) queryOptions.offset = offset;

		if (includeImages) {
			queryOptions.include = [
				{
					model: this.productImageModel,
					as: "images",
					where: { active: true },
					required: false,
				},
			];
		}

		const products = await this.productModel.findAll(queryOptions);
		return products;
	}

	/**
	 * Buscar productos por título o descripción
	 * @param {string} searchTerm - Término de búsqueda
	 * @param {Object} [options] - Opciones de búsqueda
	 * @param {boolean} [options.includeInactive=false] - Incluir productos inactivos
	 * @param {number} [options.limit=10] - Límite de resultados
	 * @returns {Promise<Array<Model>>} Productos que coinciden con la búsqueda
	 */
	async search(searchTerm, options = {}) {
		const { includeInactive = false, limit = 10 } = options;

		const where = {
			[Op.or]: [
				{ title: { [Op.iLike]: `%${searchTerm}%` } },
				{ description: { [Op.iLike]: `%${searchTerm}%` } },
				{ sku: { [Op.iLike]: `%${searchTerm}%` } },
			],
		};

		if (!includeInactive) {
			where.active = true;
		}

		const products = await this.productModel.findAll({
			where,
			limit,
			order: [["title", "ASC"]],
		});

		return products;
	}

	/**
	 * Actualizar un producto
	 * @param {string} id - UUID del producto a actualizar
	 * @param {Object} updateData - Datos a actualizar
	 * @returns {Promise<Model>} Producto actualizado
	 */
	async update(id, updateData) {
		const product = await this.productModel.findByPk(id);

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		if (updateData.characteristics) {
			updateData.characteristics = JSON.stringify(
				updateData.characteristics
			);
		}

		// Evitar que se actualice el ID
		const { id: _, ...safeUpdateData } = updateData;

		await product.update(safeUpdateData);
		return product;
	}

	/**
	 * Actualizar stock de un producto
	 * @param {string} id - UUID del producto
	 * @param {number} newStock - Nuevo valor de stock
	 * @returns {Promise<Model>} Producto actualizado
	 */
	async updateStock(id, newStock) {
		const product = await this.productModel.findByPk(id);

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		await product.update({ stock: newStock });
		return product;
	}

	/**
	 * Eliminar un producto (borrado lógico)
	 * @param {string} id - UUID del producto a eliminar
	 * @returns {Promise<boolean>} True si fue eliminado
	 */
	async softDelete(id) {
		const product = await this.productModel.findByPk(id);

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		// Borrado lógico - marcar como inactivo
		await product.update({ active: false });
		return true;
	}

	/**
	 * Eliminar un producto permanentemente (borrado físico)
	 * @param {string} id - UUID del producto a eliminar
	 * @returns {Promise<boolean>} True si fue eliminado permanentemente
	 */
	async hardDelete(id) {
		const product = await this.productModel.findByPk(id);

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		// Primero eliminamos las imágenes asociadas
		await this.productImageModel.destroy({
			where: { productId: id },
		});

		// Luego eliminamos el producto
		await product.destroy();
		return true;
	}

	/**
	 * Activar un producto previamente desactivado
	 * @param {string} id - UUID del producto a activar
	 * @returns {Promise<Model>} Producto activado
	 */
	async activate(id) {
		const product = await this.productModel.findByPk(id);

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		await product.update({ active: true });
		return product;
	}

	/**
	 * Contar total de productos
	 * @param {Object} [options] - Opciones de conteo
	 * @param {boolean} [options.includeInactive=false] - Incluir productos inactivos
	 * @returns {Promise<number>} Total de productos
	 */
	async count(options = {}) {
		const where = {};
		if (!options.includeInactive) {
			where.active = true;
		}

		const total = await this.productModel.count({ where });
		return total;
	}

	// ========== PRODUCT IMAGE METHODS ==========

	/**
	 * Agregar imagen a un producto
	 * @param {string} productId - UUID del producto
	 * @param {Object[]} images - Datos de la imagen
	 * @param {string} images[].url - URL de la imagen
	 * @param {string} images[].mimeType - Tipo MIME de la imagen
	 * @param {string} images[].filename - Nombre del archivo
	 * @param {string} images[].path - Ruta del archivo
	 * @returns {Promise<Model>} Imagen creada
	 */
	async addImages(productId, images) {
		const payload = images.map((item) => ({
			productId,
			...item,
		}));

		const currentImages = await this.productImageModel.count({ where: { productId } });

		if (currentImages === 0) {
			payload[0].isPrincipal = true;
		}

		const imagesInstance = await this.productImageModel.bulkCreate(payload);
		return imagesInstance;
	}

	/**
	 * Obtener imágenes de un producto
	 * @param {string} productId - UUID del producto
	 * @param {Object} [options] - Opciones de consulta
	 * @param {boolean} [options.includeInactive=false] - Incluir imágenes inactivas
	 * @returns {Promise<Array<Model>>} Lista de imágenes del producto
	 */
	async getProductImages(productId, options = {}) {
		const where = { productId };
		if (!options.includeInactive) {
			where.active = true;
		}

		const images = await this.productImageModel.findAll({
			where,
			order: [["created_at", "ASC"]],
		});
		return images;
	}

	/**
	 * Eliminar imagen de producto (borrado lógico)
	 * @param {string} imageId - UUID de la imagen a eliminar
	 * @returns {Promise<boolean>} True si fue eliminada
	 */
	async softDeleteImage(imageId) {
		const image = await this.productImageModel.findByPk(imageId);

		if (!image) {
			throw new NotFoundError("Product image not found");
		}

		await image.update({ active: false });
		return true;
	}

	/**
	 * Eliminar imagen de producto permanentemente
	 * @param {string} imageId - UUID de la imagen a eliminar
	 * @returns {Promise<boolean>} True si fue eliminada permanentemente
	 */
	async hardDeleteImage(imageId) {
		const image = await this.productImageModel.findByPk(imageId);

		if (!image) {
			throw new NotFoundError("Product image not found");
		}

		await unlink(image.path);

		await image.destroy();
		return true;
	}

	/**
	 * Activar imagen de producto
	 * @param {string} imageId - UUID de la imagen a activar
	 * @returns {Promise<Model>} Imagen activada
	 */
	async activateImage(imageId) {
		const image = await this.productImageModel.findByPk(imageId);

		if (!image) {
			throw new NotFoundError("Product image not found");
		}

		await image.update({ active: true });
		return image;
	}
}
