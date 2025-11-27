import { Router } from "express";

/**
 *
 * @returns {Router}
 */
export function createPaymentsRouter() {
	const router = Router();

	router.post("/stripe/create-payment-intent", async (req, res) => {
		try {
			const { amount } = req.body;
			// amount en centavos (ej: 1000 = $10.00 USD)

			const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency: 'mxn',
				automatic_payment_methods: { enabled: true },
			});

			res.send({
				clientSecret: paymentIntent.client_secret,
			});
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	});

	return router;
}
