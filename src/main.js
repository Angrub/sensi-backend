import express, { Router } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
// import Stripe from "stripe";

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
	// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

	// app.post("/api/create-payment-intent", async (req, res) => {
	// 	try {
	// 		const { amount } = req.body;

	// 		const paymentIntent = await stripe.paymentIntents.create({
	// 			amount, // en centavos (ej: 1000 = $10.00)
	// 			currency: 'mxn',
	// 			automatic_payment_methods: { enabled: true },
	// 		});

	// 		res.send({
	// 			clientSecret: paymentIntent.client_secret,
	// 		});
	// 	} catch (error) {
	// 		res.status(500).send({ error: error.message });
	// 	}
	// });

	app.use(globalErrorHandler);

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
}

main();
