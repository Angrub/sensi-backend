/**
 *
 * @param {import("sequelize").ModelCtor<Model>} categoryModel
 * @param {import("sequelize").ModelCtor<Model>} productModel
 * @param {import("sequelize").ModelCtor<Model>} productImageModel
 * @param {import("sequelize").ModelCtor<Model>} addressModel
 * @param {import("sequelize").ModelCtor<Model>} orderModel
 * @param {import("sequelize").ModelCtor<Model>} orderItemModel
 */
export function defineAssociations({
	categoryModel,
	productModel,
	productImageModel,
	addressModel,
	orderModel,
	orderItemModel,
}) {
	// Category tiene muchos Products
	categoryModel.hasMany(productModel, {
		foreignKey: "categoryId",
		as: "products",
	});

	// Product pertenece a Category (relación muchos a uno)
	productModel.belongsTo(categoryModel, {
		foreignKey: "categoryId",
		as: "category",
	});

	// Product tiene muchas ProductImage
	productModel.hasMany(productImageModel, {
		foreignKey: "productId",
		as: "images",
	});

	// ProductImage pertenece a Product
	productImageModel.belongsTo(productModel, {
		foreignKey: "productId",
		as: "product",
	});

	orderModel.belongsTo(addressModel, {
		foreignKey: "shippingAddressId",
		as: "shippingAddress",
	});

	orderModel.belongsTo(addressModel, {
		foreignKey: "customerTaxAddressId",
		as: "customerTaxAddress",
	});

	orderModel.hasMany(orderItemModel, {
		foreignKey: "orderId",
		as: "items",
	});

	orderItemModel.belongsTo(orderModel, {
		foreignKey: "orderId",
		as: "order",
	});

	productModel.hasMany(orderItemModel, {
		foreignKey: "productId",
		as: "orderItems",
	});

	orderItemModel.belongsTo(productModel, {
		foreignKey: "productId",
		as: "product",
	});
}
