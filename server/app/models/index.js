const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: "mysql",
	timezone: "+08:00",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.files = require("./file.model.js")(sequelize, DataTypes);

module.exports = db;
