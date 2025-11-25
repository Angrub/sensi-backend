import { displayProgress } from "../display/display-progress.js";
import { categories, createCategory } from "./category.seeder.js";
import { products, createProduct } from "./product.seeder.js";
import {
	modularProducts,
	createModularProduct,
} from "./modular-product.seeder.js";

async function main() {
	let counter = 0;
	let currentAction = "Creando categorias :D";
	let sillonesID, tokioID;

	for (let category of categories) {
		counter++;
		const result = await createCategory(category);

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: categories.length,
			});
			console.error(result.error);
			return;
		}

		if (result.data.title === "sillones") {
			sillonesID = result.data.id;
		}

		if (result.data.title === "Tokio") {
			tokioID = result.data.id;
		}

		await displayProgress({
			title: currentAction,
			description: result.msg,
			progress: counter,
			total: categories.length,
		});
	}

    currentAction = "Creando productos :o";
    counter = 0;

    for (let product of products) {
		counter++;
		const result = await createProduct(product, sillonesID);

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: products.length,
			});
			console.error(result.error);
			return;
		}

		await displayProgress({
			title: currentAction,
			description: result.msg,
			progress: counter,
			total: products.length,
		});
	}

    currentAction = "Creando modulares U//w//U";
    counter = 0;

    for (let modular of modularProducts) {
		counter++;
		const result = await createModularProduct(modular, tokioID);

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: modularProducts.length,
			});
			console.error(result.error);
			return;
		}

		await displayProgress({
			title: currentAction,
			description: result.msg,
			progress: counter,
			total: modularProducts.length,
		});
	}
}

main();
