import fs from "node:fs/promises";

export const modularProducts = [
	{
		title: "Modulo de ejemplo 1",
		tag: ".",
		sku: "tokio_m_1",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
	{
		title: "Modulo de ejemplo 2",
		tag: ".",
		sku: "tokio_m_2",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
	{
		title: "Modulo de ejemplo 3",
		tag: ".",
		sku: "tokio_m_3",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
	{
		title: "Modulo de ejemplo 3",
		tag: ".",
		sku: "tokio_m_4",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
	{
		title: "Modulo de ejemplo 4",
		tag: ".",
		sku: "tokio_m_5",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
	{
		title: "Modulo de ejemplo 5",
		tag: ".",
		sku: "tokio_m_6",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
	{
		title: "Modulo de ejemplo 6",
		tag: ".",
		sku: "tokio_m_7",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [],
		price: "590.00",
		stock: 10,
		images: [
			"./uploads/image-seeds/modulares/tokio(sakura).webp",
		],
	},
];

export async function createModularProduct(product, categoryId) {
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
