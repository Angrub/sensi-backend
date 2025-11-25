import { DataTypes, Sequelize, Model } from "sequelize";

/**
 *
 * @param {Sequelize} db
 * @param {Model} productModel
 */
export async function getProductImageModel(db, productModel, drop = false) {
	const model = db.define(
		"product_image",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			productId: {
				field: "product_id",
				type: DataTypes.UUID,
				references: {
					model: productModel,
					key: "id",
				},
			},
			url: {
				field: "url",
				type: DataTypes.STRING(2000),
				allowNull: false,
			},
			path: {
				field: "path",
				type: DataTypes.STRING(2000),
				allowNull: false,
			},
			mimeType: {
				field: "mime_type",
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			filename: {
				field: "filename",
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			isPrincipal: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);

	await model.sync({ force: drop });

	return model;
}
