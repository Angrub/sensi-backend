import { validationResult } from "express-validator";
import { ValidationError } from "../errorHandler.middleware.js";

/**
 * Middleware para manejar errores de validación
 */
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new ValidationError('Validation Error', errors.array()))
    }
    next();
};