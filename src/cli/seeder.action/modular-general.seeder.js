import fs from "node:fs/promises";

export const modularGeneral = [
	{
		title: "Tokio, modelo general",
		tag: "Tokio",
		sku: "tokio_g_1",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: ["./uploads/image-seeds/modulares/tokio(sakura).png"],
		isModularSet: true,
	},
	{
		title: "Milo, modelo general",
		tag: "Milo",
		sku: "milo_g_1",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: ["./uploads/image-seeds/modulares/tokio(sakura).png"],
		isModularSet: true,
	},
	{
		title: "Mira, modelo general",
		tag: "Mira",
		sku: "mira_g_1",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: ["./uploads/image-seeds/modulares/tokio(sakura).png"],
		isModularSet: true,
	},
];

export async function createModularGeneral(product, categoryId) {
	product.categoryId = categoryId;
	const imagePaths = [...product.images];
	delete product.images;

	const res = await fetch("http://localhost:3000/api/v1/products", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(product),
	});

	if (res.ok) {
		const { data } = await res.json();
		const form = new FormData();

		for (const imageUrl of imagePaths) {
			const image = await fs.readFile(imageUrl);
			const fileName = imageUrl.split("/").pop();
			const blob = new Blob([image], { type: "image/jpeg" });
			form.append("images", blob, fileName);
		}

		const imgRes = await fetch(
			`http://localhost:3000/api/v1/products/${data.id}/images`,
			{
				method: "POST",
				body: form,
			}
		);

		if (imgRes.ok) {
			return {
				data,
				error: null,
				msg: `Product: ${product.title}: Images uploaded`,
			};
		}

		const error = await imgRes.text();
		return {
			data: null,
			error,
			msg: `Product: ${product.title}: It have happened an error`,
		};
	} else {
		const error = await res.text();
		return {
			data: null,
			error,
			msg: `Product: ${product.title}: It have happened an error`,
		};
	}
}
