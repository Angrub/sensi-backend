import { Model, Op } from "sequelize";
import { AppError, NotFoundError } from "../middlewares/index.js";

export class CategoryService {
	/**
	 * Servicio para operaciones CRUD de categorías
	 * @constructor
	 * @param {import("sequelize").ModelCtor<Model>} model - Modelo de Sequelize para categorías
	 */
	constructor(model) {
		this.model = model;
	}

	/**
	 * Crear una nueva categoría
	 * @param {Object} categoryData - Datos de la categoría
	 * @param {string} categoryData.title - Título de la categoría
	 * @param {string} categoryData.tag - Tag único de la categoría
	 * @param {string} categoryData.description - Descripción de la categoría
	 * @param {string} categoryData.imageUrl - URL de la imagen
	 * @param {string} categoryData.imageMimeType - Tipo MIME de la imagen
	 * @param {string} categoryData.imageFilename - Nombre del archivo de imagen
	 * @param {boolean} [categoryData.active=true] - Estado activo/inactivo
	 * @returns {Promise<Model>} Categoría creada
	 */
	async create(categoryData) {
		const category = await this.model.create(categoryData);
		return category;
		
	}

	/**
	 * Obtener categoría por ID
	 * @param {string} id - UUID de la categoría
	 * @param {Object} [options] - Opciones de consulta
	 * @param {boolean} [options.includeInactive=false] - Incluir categorías inactivas
	 * @returns {Promise<Model|null>} Categoría encontrada o null
	 */
	async getById(id, options = {}) {
		const where = { id };

		if (!options.includeInactive) {
			where.active = true;
		}

		const category = await this.model.findOne({ where });
		return category;
	}


	/**
	 * Obtener todas las categorías
	 * @param {Object} [options] - Opciones de consulta
	 * @param {boolean} [options.includeInactive=false] - Incluir categorías inactivas
	 * @param {number} [options.limit] - Límite de resultados
	 * @param {number} [options.offset] - Offset para paginación
	 * @param {string} [options.orderBy='title'] - Campo para ordenar
	 * @param {string} [options.orderDirection='ASC'] - Dirección del orden (ASC/DESC)
	 * @returns {Promise<Array<Model>>} Lista de categorías
	 */
	async getAll(options = {}) {
		const {
			includeInactive = false,
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
		
		const categories = await this.model.findAll(queryOptions);
		return categories;
	}

	/**
	 * Buscar categorías por título o descripción
	 * @param {string} searchTerm - Término de búsqueda
	 * @param {Object} [options] - Opciones de búsqueda
	 * @param {boolean} [options.includeInactive=false] - Incluir categorías inactivas
	 * @param {number} [options.limit=10] - Límite de resultados
	 * @returns {Promise<Array<Model>>} Categorías que coinciden con la búsqueda
	 */
	async search(searchTerm, options = {}) {
		const { includeInactive = false, limit = 10 } = options;

		const where = {
			[Op.or]: [
				{ title: { [Op.iLike]: `%${searchTerm}%` } },
				{ description: { [Op.iLike]: `%${searchTerm}%` } },
				{ tag: { [Op.iLike]: `%${searchTerm}%` } },
			],
		};

		if (!includeInactive) {
			where.active = true;
		}

		const categories = await this.model.findAll({
			where,
			limit,
			order: [["title", "ASC"]],
		});

		return categories;
	}

	/**
	 * Actualizar una categoría
	 * @param {string} id - UUID de la categoría a actualizar
	 * @param {Object} updateData - Datos a actualizar
	 * @returns {Promise<Model>} Categoría actualizada
	 */
	async update(id, updateData) {
		const category = await this.model.findByPk(id);

		if (!category) {
			throw new NotFoundError("Category not found");
		}

		// Evitar que se actualice el ID
		const { id: _, ...safeUpdateData } = updateData;

		await category.update(safeUpdateData);
		return category;
	}

	/**
	 * Eliminar una categoría (borrado lógico)
	 * @param {string} id - UUID de la categoría a eliminar
	 * @returns {Promise<boolean>} True si fue eliminada
	 */
	async softDelete(id) {
		const category = await this.model.findByPk(id);

		if (!category) {
			throw new NotFoundError("Category not found");
		}

		// Borrado lógico - marcar como inactivo
		await category.update({ active: false });
		return true;
	}
    
    /**
     * Eliminar una categoría permanentemente (borrado físico)
     * @param {string} id - UUID de la categoría a eliminar
     * @returns {Promise<boolean>} True si fue eliminada permanentemente
     */
    async hardDelete(id) {
		const category = await this.model.findByPk(id);
		
		if (!category) {
			throw new NotFoundError('Category not found');
		}

		// Borrado físico - elimina el registro de la base de datos
		await category.destroy();
		return true;
    }

	/**
	 * Activar una categoría previamente desactivada
	 * @param {string} id - UUID de la categoría a activar
	 * @returns {Promise<Model>} Categoría activada
	 */
	async activate(id) {
		const category = await this.model.findByPk(id);

		if (!category) {
			throw new NotFoundError("Category not found");
		}

		await category.update({ active: true });
		return category;
		
	}

	/**
	 * Contar total de categorías
	 * @param {Object} [options] - Opciones de conteo
	 * @param {boolean} [options.includeInactive=false] - Incluir categorías inactivas
	 * @returns {Promise<number>} Total de categorías
	 */
	async count(options = {}) {
		const where = {};
		if (!options.includeInactive) {
			where.active = true;
		}

		const total = await this.model.count({ where });
		return total;
	}
}
