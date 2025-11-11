import { join } from 'node:path'
import { ValidationError } from "../index.js";
import { upload } from "./config.js";
import { __dirname } from "../../../dirname.js";

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
				const normalizedPath = file.path.replace(/\\/g, "/");
				const imageUrl = `${baseUrl}/${normalizedPath.replace(
					"uploads",
					"static"
				)}`;
				const path = join(__dirname, normalizedPath);

				return {
					url: imageUrl,
					mimeType: file.mimetype,
					filename: file.originalname,
					path
				};
			});

			req.body.images = imageData;

			next();
		} catch (error) {
			next(error);
		}
	});
}
