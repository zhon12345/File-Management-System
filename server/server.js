const express = require("express");
const cors = require("cors");

var corsOption = {
	origin: "http://localhost:5173",
};

const app = express();

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync().then(() => {
	console.log("Successfully synced db.");
});

require("./app/routes/file.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
