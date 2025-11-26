import { displayProgress } from "../display/display-progress.js";
import { categories, createCategory } from "./category.seeder.js";
import { products, createProduct } from "./product.seeder.js";
import {
	modularProducts,
	createModularProduct,
} from "./modular-product.seeder.js";
import {
	modularGeneral,
	createModularGeneral,
} from "./modular-general.seeder.js";

async function main() {
	let counter = 0;
	const total =
		categories.length +
		products.length +
		modularProducts.length +
		modularGeneral.length;

	let currentAction = "Creando categorias :D";
	let sillonesID, tokioID;
	const generalesIDs = {};

	for (let category of categories) {
		counter++;
		const result = await createCategory(category);
		
		if (["Milo", "Mira", "Tokio"].includes(result.data.title)) {
			generalesIDs[result.data.title] = result.data.id;
		}

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: total,
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
			total: total,
		});
	}

	currentAction = "Creando productos :o";

	for (let product of products) {
		counter++;
		const result = await createProduct(product, sillonesID);

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: total,
			});
			console.error(result.error);
			return;
		}

		await displayProgress({
			title: currentAction,
			description: result.msg,
			progress: counter,
			total: total,
		});
	}

	currentAction = "Creando modulares U//w//U";

	for (let modular of modularProducts) {
		counter++;
		const result = await createModularProduct(modular, tokioID);

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: total,
			});
			console.error(result.error);
			return;
		}

		await displayProgress({
			title: currentAction,
			description: result.msg,
			progress: counter,
			total: total,
		});
	}

	currentAction = "Creando modulares generales 8=======D - -";
	
	for (let general of modularGeneral) {
		counter++;

		const result = await createModularGeneral(
			general,
			generalesIDs[general.tag]
		);

		if (!result.data) {
			await displayProgress({
				title: currentAction,
				description: result.msg,
				progress: counter,
				total: total,
			});
			console.error(result.error);
			return;
		}

		await displayProgress({
			title: currentAction,
			description: result.msg,
			progress: counter,
			total: total,
		});
	}
}

main();
