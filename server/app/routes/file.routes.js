const express = require("express");
const files = require("../controllers/file.controller");
const router = express.Router();
const URL = "/api/files";

let routes = (app) => {
	router.post(`${URL}/upload`, files.create);
	router.get(`${URL}`, files.getAll);
	router.get(`${URL}/:id/:action`, files.getOne);
	router.put(`${URL}/:id/rename`, files.rename);
	router.delete(`${URL}/:id/delete`, files.delete);

	app.use(router);
};

module.exports = routes;
