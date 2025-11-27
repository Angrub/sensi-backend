import { Sequelize, DataTypes } from "sequelize";

/**
 *
 * @param {Sequelize} db
 */
export async function getShippingCostModel(db, drop = false) {
    const model = db.define(
        "shipping_cost",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            postalCode: {
                field: "postal_code",
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            cost: {
				type: DataTypes.DECIMAL(10, 4),
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
