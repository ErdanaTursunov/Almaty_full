const express = require("express");
const Answers_controller = require("../controllers/Answers_controller");
const checkAdmin = require("../middleware/checkAdmin");
const answers_router = express.Router();


answers_router.get("/", Answers_controller.get);

answers_router.get("/:id", Answers_controller.getById);


answers_router.post("/", checkAdmin, Answers_controller.post);

answers_router.patch("/:id", checkAdmin, Answers_controller.patch);

answers_router.delete("/:id", checkAdmin, Answers_controller.delete);


module.exports = answers_router;
