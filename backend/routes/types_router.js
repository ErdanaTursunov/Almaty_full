const express = require("express");
const types_router = express.Router();

const Types_controller = require("../controllers/Types_controller");
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../middleware/uploadMiddleware");

types_router.get("/", Types_controller.get);

types_router.post("/", checkAdmin, upload.single('image'), Types_controller.post);

types_router.patch("/:id", checkAdmin, upload.single('image'), Types_controller.patch);

types_router.delete("/:id", checkAdmin, Types_controller.delete);


module.exports = types_router;
