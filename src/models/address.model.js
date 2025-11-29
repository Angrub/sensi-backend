import { Sequelize, DataTypes } from "sequelize";

/**
 *
 * @param {Sequelize} db
 */
export async function getAddressModel(db, drop = false) {
    const model = db.define(
        "address",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            fullAddress: {
                field: 'full_address',
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            route: {
                type: DataTypes.STRING(131),
                allowNull: false,
            },
            streetNumber: {
                field: 'street_umber',
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            postalCode: {
                field: 'postal_code',
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            municipality: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(50),
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