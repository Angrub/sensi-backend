import express, { Router } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import { getDBConnection } from "./database.js";
import { globalErrorHandler } from "./middlewares/index.js";
import {
	getCategoryModel,
	getProductImageModel,
	getProductModel,
	defineAssociations,
} from "./models/index.js";
import {
	createCategoryRouter,
	createProductRouter,
	createCustomerRouter,
} from "./routes/index.js";

async function main() {
	dotenv.config();

	const app = express();
	const port = 3000;

	const dbConn = await getDBConnection();
	const categoryModel = await getCategoryModel(dbConn);
	const productModel = await getProductModel(dbConn, categoryModel);
	const productImageModel = await getProductImageModel(dbConn, productModel);
	defineAssociations(categoryModel, productModel, productImageModel);

	const categoryRouter = createCategoryRouter(categoryModel);
	const productRouter = createProductRouter(productModel, productImageModel);
	const customerRouter = createCustomerRouter(
		categoryModel,
		productModel,
		productImageModel
	);

	app.use(express.json());
	app.use(cors({ origin: [process.env.WEB_URL] }));
	app.use("/static", express.static("uploads"));

	const mainRouter = Router();

	mainRouter.use("/v1/categories", categoryRouter);
	mainRouter.use("/v1/products", productRouter);
	mainRouter.use("/v1/customer", customerRouter);

	app.use("/api", mainRouter);

	app.use(globalErrorHandler);

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
}

main();
