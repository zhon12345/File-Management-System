module.exports = (sequelize, DataTypes) => {
	const File = sequelize.define("file", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ext: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		path: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		parent: {
			type: DataTypes.UUID,
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	return File;
};
