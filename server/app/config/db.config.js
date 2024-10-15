module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "",
	DB: "file-management-system",
	dialect: "mysql",
	timezone: "+08:00",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
