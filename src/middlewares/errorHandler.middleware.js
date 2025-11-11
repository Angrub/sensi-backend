/**
 * Clase personalizada para errores de la aplicación
 */
export class AppError extends Error {
	/**
	 * @param {string|object} message - Mensaje de error
	 * @param {number} statusCode - Código de estado HTTP
	 * @param {boolean} isOperational - Si es un error operacional (esperado)
	 */
	constructor(message, statusCode = 500, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error para recursos no encontrados
 */
export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}

/**
 * Error para validación de datos
 */
export class ValidationError extends AppError {
	constructor(message = "Validation failed", details) {
		super(message, 400);
		this.details = details;
	}
}

/**
 * Error para conflictos (duplicados, etc.)
 */
export class ConflictError extends AppError {
	constructor(message = "Conflict occurred") {
		super(message, 409);
	}
}

/**
 * Manejador global de errores para Express
 */
export const globalErrorHandler = (err, req, res, next) => {
	// Establecer valores por defecto
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	// Log del error (en desarrollo mostrar más detalles)
	if (process.env.NODE_ENV === "development") {
		console.error("💥 ERROR:", {
			message: err.message,
			stack: err.stack,
			url: req.originalUrl,
			method: req.method,
			body: req.body,
			params: req.params,
			query: req.query,
			timestamp: new Date().toISOString(),
		});
	} else {
		// En producción, log más limpio
		console.error("💥 ERROR:", {
			message: err.message,
			url: req.originalUrl,
			method: req.method,
			timestamp: new Date().toISOString(),
		});
	}

	// Respuesta para el cliente
	if (err.isOperational) {
		// Errores operacionales (que esperamos)
		res.status(err.statusCode).json({
			success: false,
			status: err.status,
			message: err.message,
			...(process.env.NODE_ENV === "development" && {
				stack: err.stack,
				error: err,
			}),
		});
	} else {
		// Errores de programación o inesperados
		res.status(500).json({
			success: false,
			status: "error",
			message: "Something went wrong!",
			...(process.env.NODE_ENV === "development" && {
				stack: err.stack,
				error: err.message,
			}),
		});
	}
};

/**
 * Wrapper async para evitar try/catch en los controladores
 */
export const asyncHandler = (fn) => {
	return async (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
