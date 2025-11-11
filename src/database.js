import { Sequelize } from "sequelize";

let sequelize = undefined;

/**
 *
 * @returns {Promise<Sequelize>}
 */
export async function getDBConnection() {
	if (sequelize) return sequelize;

	const dataConn = {
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
	};

	if (!dataConn.user || !dataConn.password || !dataConn.name) {
		throw new Error(`DB connection variables are undefined`);
	}

	sequelize = new Sequelize(
		`postgres://${dataConn.user}:${dataConn.password}@localhost:5432/${dataConn.name}`,
		{ logging: false }
	);

	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		return sequelize;
	} catch (error) {
		throw new Error("Unable to connect to the database:", error);
	}
}
