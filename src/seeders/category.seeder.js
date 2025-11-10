import fs from "node:fs/promises";

const categories = [
	{
		title: "modulares",
		tag: "Configuraciones de 3-4-5 piezas Diseños modulares",
		description:
			"Diseña tu espacio a tu manera con nuestra colección de salas modulares, variedad de telas configuraciones y estilos que se adaptan a tu hogar.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/modulares.jpg",
	},
	{
		title: "camas",
		tag: "Kingsize individuales y Matrimoniales",
		description:
			"Descansa como es debido con nuestra linea de camas Sensi Home. Kingsize, Matrimoniales o individuales con diseños modernos y confort inigualable.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/camas.jpg",
	},
	{
		title: "sillones",
		tag: "Giratorios, estaticos, Sillas tapizadas y puffs",
		description:
			"Dale estilo a tu Sala la Línea de Sillones Individuales de Sensi Home, con ellos encontrarás variedad de telas, formas y diseños que te cautivarán",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/SILLONES.jpg",
	},
	{
		title: "comedores",
		tag: "Giratorios, estaticos, Sillas tapizadas y puffs",
		description:
			"Tranforma tus cenas y comidas con nuestros comedores de Sensi Home. Diseños elegantes y funcionales que se adaptan a cualquier espacio y estilo de vida.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/COMEDORES.jpg",
	},
	{
		title: "salas 3-2-1",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/321.jpg",
	},
	{
		title: "esquineras",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/ESQUINERAS.jpg",
	},
	{
		title: "cuadros",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/cuadros.jpg",
	},
	{
		title: "decorativos",
		tag: "Modelos adaptables a espacios",
		description:
			"Aprovecha cada rincón de tu sala con nuestras esquineras. Modelos versátiles y cómodos, ideales para departamentos o casas familiares.",
		imageUrl:
			"/home/mary/Proyectos/sensi-backend/uploads/image-seeds/categories/decorativos.jpg",
	},
];

async function seeder() {
	try {
		for (const category of categories) {
			const data = new FormData();
			data.append("title", category.title);
			data.append("tag", category.tag);
			data.append("description", category.description);

			const file = await fs.readFile(category.imageUrl);
			data.append("image", file);

			const res = await fetch({
				url: "http://localhost:3000/categories",
				method: "POST",
				headers: {
					"content-type": "multipart/form-data",
				},
				body: data,
			});

			if (res.ok) {
				const { data } = await res.json();
				console.log(data);
			} else {
				console.error("It have happened an error");
			}
		}
	} catch (error) {
		console.error(error);
	}
}

seeder();
