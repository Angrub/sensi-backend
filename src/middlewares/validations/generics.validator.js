import { param, query } from "express-validator";

export const validateIDParam = [
	param("id").isUUID(4).withMessage("Invalid ID format"),
];

export const validateIncludeInactiveParam = [
	query("includeInactive").optional().isBoolean().toBoolean(),
];
