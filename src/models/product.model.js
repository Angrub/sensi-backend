import { DataTypes, Sequelize, Model } from "sequelize";

/**
 *
 * @param {Sequelize} db
 * @param {Model} categoryModel
 */
export async function getProductModel(db, categoryModel) {
	const model = db.define(
		"product",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL(10, 4),
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			categoryId: {
				field: "category_id",
				type: DataTypes.UUID,
				references: {
					model: categoryModel,
					key: "id",
				},
			},
		},
		{
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);

	await model.sync({ force: process.env.FORCE_DB_SYNC || false });

	return model;
}
