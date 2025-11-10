import { Sequelize, DataTypes } from "sequelize";

/**
 *
 * @param {Sequelize} db
 */
export async function getCategoryModel(db) {
	const model = db.define(
		"category",
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
			tag: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageUrl: {
				field: "image_url",
				type: DataTypes.STRING(2000),
				allowNull: false,
			},
			imageMimeType: {
				field: "image_mime_type",
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			imageFilename: {
				field: "image_filename",
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);

	await model.sync();

	return model;
}
