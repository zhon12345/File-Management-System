const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");

const MAX_FILE_SIZE = 512 * 1024 * 1024;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = "./resources/uploads";

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		const name = crypto.randomUUID();
		cb(null, name);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: MAX_FILE_SIZE },
}).array("files");

module.exports = upload;
