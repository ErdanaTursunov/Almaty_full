const express = require("express");
const events_router = express.Router();

const Events_controller = require("../controllers/Events_controller");
const checkAdmin = require("../middleware/checkAdmin");

events_router.get("/", Events_controller.get);

events_router.post("/", checkAdmin, Events_controller.post);

events_router.patch("/:id", checkAdmin, Events_controller.patch);

events_router.delete("/:id", checkAdmin, Events_controller.delete);

module.exports = events_router;
