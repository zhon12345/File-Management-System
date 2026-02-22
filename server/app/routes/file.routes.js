const express = require("express");
const upload = require("../middleware/upload");
const files = require("../controllers/file.controller");
const router = express.Router();
const URL = "/api/files";

const routes = (app) => {
	router.post("/", upload, files.create);
	router.get("/", files.getAll);
	router.get("/:id/content", files.getOne);
	router.patch("/:id", files.rename);
	router.delete("/:id", files.delete);

	app.use(URL, router);
};

module.exports = routes;
