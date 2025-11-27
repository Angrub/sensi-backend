import { Sequelize, DataTypes, Model } from "sequelize";

/**
 *
 * @param {Sequelize} db
 * @param {Model} orderModel
 * @param {Model} productModel
 */
export async function getOrderItemModel(db, orderModel, productModel, drop = false) {
	const model = db.define(
		"order_item",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
            orderId: {
				field: "order_id",
				type: DataTypes.UUID,
				references: {
					model: orderModel,
					key: "id",
				},
			},
            productId: {
				field: "product_id",
				type: DataTypes.UUID,
				references: {
					model: productModel,
					key: "id",
				},
			},
            quantity: {
                type: DataTypes.INTEGER,
				allowNull: false,
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
