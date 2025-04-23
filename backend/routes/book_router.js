const express = require("express");
const book_router = express.Router();
const BookController = require("../controllers/Book_controller");
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../middleware/uploadBookMiddleware");

// GET все книги
book_router.get("/", BookController.get);


book_router.get("/:id", BookController.getById);

// POST новая книга
book_router.post("/", checkAdmin, upload.single('image'), BookController.post);

// PATCH обновить книгу по ID
book_router.patch("/:id", checkAdmin, upload.single('image'), BookController.patch);

// DELETE удалить книгу по ID
book_router.delete("/:id", checkAdmin, BookController.delete);


module.exports = book_router;
