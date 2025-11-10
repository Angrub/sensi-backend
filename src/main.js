import express from "express";
import * as dotenv from "dotenv";

import { getDBConnection } from "./database.js";
import {
	globalErrorHandler,
} from "./middlewares/index.js";
import {
	getCategoryModel,
	getProductImageModel,
	getProductModel,
} from "./models/index.js";
import { createCategoryRouter, createProductRouter } from "./routes/index.js";

async function main() {
	dotenv.config();
	
	const app = express();
	const port = 3000;

	const dbConn = await getDBConnection();
	const categoryModel = await getCategoryModel(dbConn);
	const productModel = await getProductModel(dbConn);
	const productImageModel = await getProductImageModel(dbConn, productModel);

	const categoryRouter = createCategoryRouter(categoryModel);
	const productRouter = createProductRouter(productModel, productImageModel);

	app.use(express.json())
	app.use("/static", express.static("uploads"));

	app.use("/categories", categoryRouter);
	app.use("/products", productRouter);

	app.use(globalErrorHandler);

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
}

main();
