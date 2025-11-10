import { ValidationError } from "../index.js";
import { upload } from "./config.js";

export function processProductsImages(req, res, next) {
	upload.array("images")(req, res, (err) => {
		try {
			if (err) {
				throw new ValidationError(err.message);
			}

			// Si no hay archivos, continuar sin modificar el body
			if (!req.files || req.files.length === 0) {
				throw new ValidationError("images field not valid");
			}

			// Procesar cada archivo y agregar información al body
			const imageData = req.files.map((file) => {
				const baseUrl = process.env.BASE_URL;
				const imageUrl = `${baseUrl}/${file.path
					.replace(/\\/g, "/")
					.replace("uploads", "static")}`;

				return {
					url: imageUrl,
					mimeType: file.mimetype,
					filename: file.originalname,
				};
			});

			req.body.images = imageData;

			next();
		} catch (error) {
			next(error);
		}
	});
}
