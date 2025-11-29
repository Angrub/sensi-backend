import * as dotenv from "dotenv";

import { displayProgress } from "./display/display-progress.js";
import { getDBConnection } from "../database.js";
import {
	defineAssociations,
	getCategoryModel,
	getProductImageModel,
	getProductModel,
	getAddressModel,
	getOrderModel,
	getOrderItemModel,
	getShippingCostModel
} from "../models/index.js";

async function main() {
	const delay = 200;
	dotenv.config();
	const dbConn = await getDBConnection();
	const total = 8;

	await displayProgress({
		title: "Recreando tabla de categorias",
		description: "T//w//T",
		progress: 1,
		total,
		timeout: delay,
	});
	const categoryModel = await getCategoryModel(dbConn, true);

	await displayProgress({
		title: "Recreando tabla de producto",
		description: "p//w//p",
		progress: 2,
		total,
		timeout: delay,
	});
	const productModel = await getProductModel(dbConn, categoryModel, true);

	await displayProgress({
		title: "Recreando tabla de imagenes de productos",
		description: "O//w//O",
		progress: 3,
		total,
		timeout: delay,
	});
	const productImageModel = await getProductImageModel(
		dbConn,
		productModel,
		true
	);

	await displayProgress({
		title: "Recreando tabla de direcciones",
		description: "U//w//U",
		progress: 4,
		total,
		timeout: delay,
	});
	const addressModel = await getAddressModel(dbConn, true);

	await displayProgress({
		title: "Recreando tabla de ordenes",
		description: "T//w//T",
		progress: 5,
		total,
		timeout: delay,
	});
	const orderModel = await getOrderModel(dbConn, addressModel, true);
	
	await displayProgress({
		title: "Recreando tabla de items de compra",
		description: "p//w//p",
		progress: 6,
		total,
		timeout: delay,
	});
	const orderItemModel = await getOrderItemModel(
		dbConn,
		orderModel,
		productModel,
		true
	);
	
	await displayProgress({
		title: "Recreando tabla de costos de envío",
		description: "O//w//O",
		progress: 7,
		total,
		timeout: delay,
	});
	await getShippingCostModel(dbConn, true);

	await displayProgress({
		title: "Definiendo relaciones de las tablas	",
		description: "U//w//U",
		progress: total,
		total,
		timeout: delay,
	});
	defineAssociations({
		categoryModel,
		productModel,
		productImageModel,
		addressModel,
		orderModel,
		orderItemModel,
	});

	dbConn.close();
}

main();
