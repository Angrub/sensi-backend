import { Sequelize, DataTypes } from "sequelize";

/**
 *
 * @param {Sequelize} db
 */
export async function getOrderModel(db, drop = false) {
    const model = db.define(
        "order",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            folio: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            paymentStatus: {
                field: "payment_status",
                type: DataTypes.ENUM(["awaiting_payment", "paid", "delivered"]),
                allowNull: false,
            },
            paymentRef: {
                field: "payment_ref",
                type: DataTypes.STRING(), // agregar un max legth acorde a las referencias de pagos de ml y stripe
            },
            customerFullName: {
                field: 'customer_full_name',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            
            customerEmail: {
                field: 'customer_email',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            customerPhone: {
                field: 'customer_phone',
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            customerRequireInvoice: {
                field: 'customer_require_invoice',
                type: DataTypes.BOOLEAN(),
                allowNull: false,
            },
            customerRFC: {
                field: 'customer_rfc',
                type: DataTypes.STRING(13),
                allowNull: false,
            },
            customerBusinessName: {
                field: 'customer_business_name',
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            // customerTaxAddress: {
            //     field: 'customer_full_name',
            //     type: DataTypes.STRING(15),
            //     allowNull: false,
            // },
            customerCFDIUse: {
                field: 'customer_cfdi_use',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            customerTaxRegime: {
                field: 'customer_tax_regime',
                type: DataTypes.STRING(100),
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
