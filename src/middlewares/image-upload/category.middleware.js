import { join } from "node:path";
import { ValidationError } from "../index.js";
import { upload } from "./config.js";
import { __dirname } from "../../../dirname.js";

export function processCategoryImage(isOptional = false) {
	return (req, res, next) => {
		upload.single("image")(req, res, (err) => {
			if (err) {
				throw new ValidationError(err.message);
			}

			if (isOptional) {
				if (!req.file) {
					next();
					return;
				}
			} else {
				if (!req.file) {
					throw new ValidationError("image field not valid");
				}
			}

			const normalizedPath = req.file.path.replace(/\\/g, "/");

			req.body.imageUrl = `${
				process.env.BASE_URL
			}/${normalizedPath.replace("uploads", "static")}`;
			req.body.imagePath = join(__dirname, normalizedPath);
			req.body.imageMimeType = req.file.mimetype;
			req.body.imageFilename = req.file.originalname;

			next();
		});
	};
}
