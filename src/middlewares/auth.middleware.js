import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
	try {
		const authHeader = req.header("Authorization");

		if (!authHeader) {
			return res.status(401).json({
				success: false,
				message: "Acceso denegado. No se proporcionó token.",
			});
		}

		const parts = authHeader.split(" ");
		if (parts.length !== 2 || parts[0] !== "Bearer") {
			return res.status(401).json({
				success: false,
				message: "Formato de token inválido. Use: Bearer <token>",
			});
		}

		const token = parts[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token no proporcionado",
			});
		}

		const decoded = jwt.verify(token, JWT_SECRET);

		req.user = decoded;

		next();
	} catch (error) {
		console.error("Error en autenticación JWT:", error.message);

		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({
				success: false,
				message: "Token inválido",
			});
		}

		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				success: false,
				message: "Token expirado",
			});
		}

		return res.status(500).json({
			success: false,
			message: "Error en la autenticación",
		});
	}
}

export function generateToken(userData, expiresIn = "24h") {
	const payload = {
		id: userData.id,
		email: userData.email,
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
