
/**
 * 
 * @param {import("sequelize").ModelCtor<Model>} categoryModel 
 * @param {import("sequelize").ModelCtor<Model>} productModel 
 * @param {import("sequelize").ModelCtor<Model>} productImageModel 
 */
export function defineAssociations(
	categoryModel,
	productModel,
	productImageModel
) {
	// Product pertenece a Category (relación muchos a uno)
	productModel.belongsTo(categoryModel, {
		foreignKey: "categoryId",
		as: "category",
	});

	// Category tiene muchos Products
	categoryModel.hasMany(productModel, {
		foreignKey: "categoryId",
		as: "products",
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
}
