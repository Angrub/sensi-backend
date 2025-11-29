import express, { Router } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";

import { getDBConnection } from "./database.js";
import { globalErrorHandler } from "./middlewares/index.js";
import {
	getCategoryModel,
	getProductImageModel,
	getProductModel,
	getAddressModel,
	getOrderModel,
	getOrderItemModel,
	getShippingCostModel,
	defineAssociations,
} from "./models/index.js";
import {
	createCategoryRouter,
	createProductRouter,
	createCustomerRouter,
	createPaymentsRouter,
} from "./routes/index.js";

async function main() {
	dotenv.config();
	const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

	const app = express();
	const port = 3000;

	const dbConn = await getDBConnection();
	const categoryModel = await getCategoryModel(dbConn);
	const productModel = await getProductModel(dbConn, categoryModel);
	const productImageModel = await getProductImageModel(dbConn, productModel);
	const addressModel = await getAddressModel(dbConn);
	const orderModel = await getOrderModel(dbConn, addressModel);
	const orderItemModel = await getOrderItemModel(dbConn, orderModel, productModel);
	const shippingCostModel = await getShippingCostModel(dbConn);
	
	defineAssociations({
		categoryModel,
		productModel,
		productImageModel,
		addressModel,
		orderModel,
		orderItemModel,
		shippingCostModel
	});

	const categoryRouter = createCategoryRouter(categoryModel);
	const productRouter = createProductRouter(productModel, productImageModel);
	const customerRouter = createCustomerRouter(
		categoryModel,
		productModel,
		productImageModel
	);
	const paymentsRouter = createPaymentsRouter();

	app.use(express.json());
	app.use(cors({ origin: [process.env.WEB_URL] }));
	app.use("/static", express.static("uploads"));

	const mainRouter = Router();

	mainRouter.use("/v1/categories", categoryRouter);
	mainRouter.use("/v1/products", productRouter);
	mainRouter.use("/v1/customer", customerRouter);
	mainRouter.use("/v1/payments", paymentsRouter);

	app.use("/api", mainRouter);

	app.use(globalErrorHandler);

	app.listen(port, () => {
		console.log(`Sensi backend listening on port ${port}`);
	});
}

main();
