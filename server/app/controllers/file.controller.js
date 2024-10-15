const uploadFile = require("../middleware/upload");
const db = require("../models");
const File = db.files;
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require("fs").promises;

exports.create = async (req, res) => {
	try {
		await uploadFile(req, res);

		if (!req.files || req.files.length === 0) {
			return res.status(400).send({ message: "No files selected." });
		}

		const files = req.files.map((file) => ({
			name: path.parse(file.originalname).name,
			ext: path.extname(file.originalname),
			path: file.path,
			size: file.size,
			createdAt: null,
		}));

		const messages = [];

		await File.bulkCreate(files, { individualHooks: true })
			.then((data) => {
				data.forEach((file) => {
					messages.push(`Successfully uploaded ${file.name}${file.ext}`);
				});
			})
			.catch((err) => {
				files.forEach((file) => {
					messages.push(`Could not upload ${file.name}${file.ext}: ${err.message}`);
				});
			});

		res.status(200).send({
			message: messages,
			filesUploaded: files.length,
		});
	} catch (err) {
		if (err.code == "LIMIT_FILE_SIZE") {
			return res.status(500).send({
				message: "File size cannot be larger than 512MB!",
			});
		}

		res.status(500).send({
			message: `Error uploading file(s): ${err.message}`,
		});
	}
};

exports.getAll = (req, res) => {
	let fileInfos = [];
	const query = req.query.query;

	const condition = query ? { [Op.or]: [{ name: { [Op.like]: `%${query}%` } }, { ext: { [Op.like]: `%${query}%` } }] } : null;

	File.findAll({ where: condition })
		.then((files) => {
			files.forEach((file) => {
				fileInfos.push({
					id: file.id,
					ext: file.ext,
					name: file.name,
					path: file.path,
					size: file.size,
					created: file.createdAt,
					updated: file.updatedAt,
				});
			});

			res.status(200).send(fileInfos);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving files: ${err.message}`,
			});
		});
};

exports.getOne = async (req, res) => {
	const id = req.params.id;
	const action = req.params.action;

	try {
		const file = await File.findOne({ where: { id: id } });
		if (!file) {
			return res.status(404).send({
				message: "File not found.",
			});
		}

		const absolutePath = path.resolve(file.path);
		if (action === "download") {
			res.download(absolutePath, `${file.name}${file.ext}`, (err) => {
				if (err) {
					res.status(500).send({
						message: `Could not download ${file.name}${file.ext}: ${err.message}`,
					});
				}
			});
		} else if (action === "view") {
			res.sendFile(absolutePath, (err) => {
				if (err) {
					res.status(500).send({
						message: `Could not view ${file.name}${file.ext}: ${err.message}`,
					});
				}
			});
		}
	} catch (err) {
		res.status(500).send({
			message: `Error retrieving file: ${err.message}`,
		});
	}
};

exports.rename = async (req, res) => {
	const id = req.params.id;

	try {
		const file = await File.findOne({ where: { id: id } });
		if (!file) {
			res.status(404).send({
				message: "File not found.",
			});
		}

		let name = path.parse(req.body.name).name;
		await File.update({ name: name }, { where: { id: id } });

		res.status(200).send({
			message: `Successfully renamed ${file.name}${file.ext}`,
		});
	} catch (err) {
		if (err.code === "ENOENT") {
			return res.status(404).send({
				message: "File not found.",
			});
		}

		res.status(500).send({
			message: `Error renaming file: ${err.message}`,
		});
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		const file = await File.findOne({ where: { id: id } });
		if (!file) {
			res.status(404).send({
				message: "File not found.",
			});
		}

		await fs.unlink(file.path);

		const num = await File.destroy({ where: { id: id } });

		if (num === 1) {
			res.send({
				message: `Successfully deleted ${file.name}${file.ext}`,
			});
		} else {
			res.status(404).send({
				message: "File not found.",
			});
		}
	} catch (err) {
		res.status(500).send({
			message: `Error deleting file: ${err.message}`,
		});
	}
};
