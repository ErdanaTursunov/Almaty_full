const express = require("express");
const news_router = express.Router();

const News_controller = require("../controllers/News_controller");
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../middleware/uploadMiddleware");

news_router.get("/", News_controller.get);

news_router.get("/:id", News_controller.getById);

news_router.post("/", checkAdmin, upload.single('image'), News_controller.post);

news_router.patch("/:id", checkAdmin, upload.single('image'), News_controller.patch);

news_router.delete("/:id", checkAdmin, News_controller.delete);


module.exports = news_router;
