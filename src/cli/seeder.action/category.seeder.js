import fs from "node:fs/promises";

export const categories = [
	{
		title: "modulares",
		tag: "Configuraciones de 3-4-5 piezas Diseños modulares",
		description:
			"Diseña tu espacio a tu manera con nuestra colección de salas modulares, variedad de telas configuraciones y estilos que se adaptan a tu hogar.",
		imageUrl: "./uploads/image-seeds/categories/modulares.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "camas",
		tag: "Kingsize individuales y Matrimoniales",
		description:
			"Descansa como es debido con nuestra linea de camas Sensi Home. Kingsize, Matrimoniales o individuales con diseños modernos y confort inigualable.",
		imageUrl: "./uploads/image-seeds/categories/camas.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "sillones",
		tag: "Giratorios, estaticos, Sillas tapizadas y puffs",
		description:
			"Dale estilo a tu Sala la Línea de Sillones Individuales de Sensi Home, con ellos encontrarás variedad de telas, formas y diseños que te cautivarán",
		imageUrl: "./uploads/image-seeds/categories/SILLONES.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "comedores",
		tag: "Giratorios, estaticos, Sillas tapizadas y puffs",
		description:
			"Tranforma tus cenas y comidas con nuestros comedores de Sensi Home. Diseños elegantes y funcionales que se adaptan a cualquier espacio y estilo de vida.",
		imageUrl: "./uploads/image-seeds/categories/COMEDORES.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "salas 3-2-1",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/categories/321.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "esquineras",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/categories/ESQUINERAS.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "cuadros",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/categories/cuadros.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "decorativos",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/categories/decorativos.jpg",
		isVisibleFromNavbar: true,
		isModularType: false,
	},
	{
		title: "Milo",
		tag: "GIRATORIO | ALTURA AJUSTABLE",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/modulares/milo.png",
		isVisibleFromNavbar: false,
		isModularType: true,
	},
	{
		title: "Mira",
		tag: "GIRATORIO | ALTURA AJUSTABLE",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/modulares/mira.png",
		isVisibleFromNavbar: false,
		isModularType: true,
	},
	{
		title: "Tokio",
		tag: "GIRATORIO | ALTURA AJUSTABLE",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl: "./uploads/image-seeds/modulares/tokio.jpg",
		isVisibleFromNavbar: false,
		isModularType: true,
	},
];

export async function createCategory(category) {
	const data = new FormData();
	data.append("title", category.title);
	data.append("tag", category.tag);
	data.append("description", category.description);
	data.append("isVisibleFromNavbar", category.isVisibleFromNavbar);
	data.append("isModularType", category.isModularType);

	const filename = category.imageUrl.split("/").pop();
	const fileBuffer = await fs.readFile(category.imageUrl);
	const image = new Blob([fileBuffer], { type: "image/jpeg" });
	data.append("image", image, filename);

	const res = await fetch("http://localhost:3000/api/v1/categories", {
		method: "POST",
		body: data,
	});

	if (res.ok) {
		const { data } = await res.json();
		return { data, error: null, msg: `Category ${category.title}: Created successfully` };
	}

	return {
		data: null,
		error,
		msg: `Category ${category.title}: It have happened an error`,
	};
}
