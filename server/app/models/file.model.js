module.exports = (sequelize, Sequelize) => {
	const File = sequelize.define("file", {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		ext: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		path: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		parent: {
			type: Sequelize.INTEGER,
		},
		size: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	return File;
};
