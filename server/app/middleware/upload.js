const multer = require("multer");
const fs = require("fs");
const path = require("path");
const util = require("util");
const crypto = require("crypto");

const MAX_FILE_SIZE = 512 * 1024 * 1024;

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = "./resources/uploads";

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		const name = crypto.randomUUID();
		const ext = path.extname(file.originalname);
		cb(null, `${name}${ext}`);
	},
});

let uploadFile = multer({
	storage: storage,
	limits: { fileSize: MAX_FILE_SIZE },
}).array("files");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
