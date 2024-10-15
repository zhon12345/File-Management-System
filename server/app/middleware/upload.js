const multer = require("multer");
const fs = require("fs");
const path = require("path");
const util = require("util");
const maxSize = 512 * 1024 * 1024;

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = "./resources/uploads";

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		const name = path.parse(file.originalname).name;
		const ext = path.extname(file.originalname);
		cb(null, `${name}-${Date.now()}${ext}`);
	},
});

let uploadFile = multer({
	storage: storage,
	limits: { fileSize: maxSize },
}).array("files");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
