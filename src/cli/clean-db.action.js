import * as dotenv from "dotenv";

import { displayProgress } from "./display/display-progress.js";
import { getDBConnection } from "../database.js";
import { defineAssociations } from "../models/associations.js";
import { getCategoryModel } from "../models/category.model.js";
import { getProductImageModel } from "../models/product-image.model.js";
import { getProductModel } from "../models/product.model.js";

async function main() {
	dotenv.config();
	const dbConn = await getDBConnection();
	const total = 4;

	await displayProgress({
		title: "Recreando tabla de categorias",
		description: "T//w//T",
		progress: 1,
		total,
		timeout: 1000,
	});
	const categoryModel = await getCategoryModel(dbConn, true);

	await displayProgress({
		title: "Recreando tabla de producto",
		description: "p//w//p",
		progress: 2,
		total,
		timeout: 1000,
	});
	const productModel = await getProductModel(dbConn, categoryModel, true);

	await displayProgress({
		title: "Recreando tabla de imagenes de productos",
		description: "O//w//O",
		progress: 3,
		total,
		timeout: 1000,
	});
	const productImageModel = await getProductImageModel(
		dbConn,
		productModel,
		true
	);
	
	defineAssociations(categoryModel, productModel, productImageModel);
	await displayProgress({
		title: "Definiendo relaciones",
		description: "U//w//U",
		progress: total,
		total,
		timeout: 1000,
	});

	dbConn.close();
}

main();
