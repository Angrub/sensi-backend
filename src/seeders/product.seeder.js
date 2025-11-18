import fs from "node:fs/promises";

const categoryId = "2e4c5485-f872-4f98-ae9b-721f70da316f"

const products = [
	{
		title: "hanna",
		tag: "giratorio | altura ajustable",
		sku: "hanna",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "4490.00",
		stock: 65,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/hanna/hanna_portada.jpg",
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/hanna/hannaisometrico.jpg",
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/hanna/hannaambientado.png",
		],
	},
	{
		title: "slate",
		tag: "giratorio | altura ajustable",
		sku: "slate",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "3400.00",
		stock: 43,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/slate/slate_portada.jpg",
		],
	},
	{
		title: "sahara",
		tag: "giratorio | altura ajustable",
		sku: "sahara",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "3200.00",
		stock: 26,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/sahara/sahara_portada.jpg",
		],
	},
	{
		title: "osaka",
		tag: "giratorio | altura ajustable",
		sku: "osaka",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "4200.00",
		stock: 29,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/Osaka/osaka_portada.jpg",
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/Osaka/osaka_isometrico.jpg",
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/Osaka/osaka_ambientada.png",
		],
	},
	{
		title: "noir",
		tag: "giratorio | altura ajustable",
		sku: "noir",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "3700.00",
		stock: 11,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/noir/noir_portada.jpg",
		],
	},
	{
		title: "kanda",
		tag: "giratorio | altura ajustable",
		sku: "kanda",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "3995.00",
		stock: 0,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/kanda/kanda_portada.jpg",
		],
	},
	{
		title: "vicent",
		tag: "giratorio | altura ajustable",
		sku: "vicent",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "6500.00",
		stock: 6,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/vicent/vicent_portada.jpg",
		],
	},
	{
		title: "bubbly",
		tag: "giratorio | altura ajustable",
		sku: "bubbly",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "3300.00",
		stock: 70,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/bubbly/bubbly_portada.jpg",
		],
	},
	{
		title: "bastian",
		tag: "giratorio | altura ajustable",
		sku: "bastian",
		description:
			"Sillón giratorio con altura ajustable, pensado para brindar confort y estilo en cualquier espacio.",
		characteristics: [
			"Gira 360°",
			"Ajuste de altura neumático",
			"Tapizado suave al tacto",
			"Estructura metálica resistente",
		],
		price: "6500.00",
		stock: 6,
		categoryId,
		images: [
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/products/sillones/bastian/bastian_portada.jpg",
		],
	},
];

async function seeder() {
	try {
		for (const product of products) {
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
				console.log(data);
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
					console.log("images uploaded");
				}
			} else {
				console.error("It have happened an error");
				const error = await res.text();
				console.error(error);
			}
		}
	} catch (error) {
		console.error(error);
	}
}

seeder();
