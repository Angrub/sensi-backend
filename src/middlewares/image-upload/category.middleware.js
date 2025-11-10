import { ValidationError } from "../index.js";
import { upload } from "./config.js";

export function processCategoryImage(req, res, next) {
	upload.single("image")(req, res, (err) => {
		if (err) {
			throw new ValidationError(err.message);
		}

		if (!req.file) {
			throw new ValidationError("image field not valid");
		}

		req.body.imageUrl = `${process.env.BASE_URL}/${req.file.path
			.replace(/\\/g, "/")
			.replace("uploads", "static")}`;
		req.body.imageMimeType = req.file.mimetype;
		req.body.imageFilename = req.file.originalname;

		next();
	});
}
