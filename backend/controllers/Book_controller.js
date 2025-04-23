const { db } = require("../models");
const fs = require('fs').promises;
const path = require('path');

class Book_controller {
    async get(req, res) {
        try {
            const books = await db.Books.findAll();
            return res.status(200).json({ books });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, Book_controller", error });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const book = await db.Books.findByPk(id);

            if (!book) {
                return res.status(404).json({ message: "Книга не найдена" });
            }

            return res.status(200).json({ book });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в getById, Book_controller", error });
        }
    }

    async post(req, res) {
        try {
            const { quantity, year, Genr, author, title } = req.body;

            if (!title || !author ) {
                if (req.file) await fs.unlink(req.file.path).catch(console.error);
                return res.status(400).json({ message: "Название, автор и тип обязательны" });
            }

            const existing = await db.Books.findOne({ where: { title, author } });
            if (existing) {
                if (req.file) await fs.unlink(req.file.path).catch(console.error);
                return res.status(409).json({ message: "Книга с таким названием и автором уже существует" });
            }

            let img_url = req.file ? `/uploads/books/${req.file.filename}` : null;

            const book = await db.Books.create({ title, quantity, year, Genr, author, img_url });
            return res.status(201).json({ book });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в post, Book_controller", error });
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = {};

            if (req.body.quantity) updates.quantity = req.body.quantity;
            if (req.body.year) updates.year = req.body.year;
            if (req.body.Genr) updates.Genr = req.body.Genr;
            if (req.body.author) updates.author = req.body.author;
            if (req.body.title) updates.title = req.body.title;

            const book = await db.Books.findByPk(id);
            if (!book) {
                if (req.file) await fs.unlink(req.file.path).catch(console.error);
                return res.status(404).json({ message: "Книга не найдена" });
            }

            if (updates.title && updates.author) {
                const duplicate = await db.Books.findOne({
                    where: {
                        title: updates.title,
                        author: updates.author,
                    },
                });

                if (duplicate && duplicate.id !== Number(id)) {
                    return res.status(409).json({ message: "Такая книга уже существует" });
                }
            }

            if (req.file) {
                if (book.img_url) {
                    const oldPath = path.join(__dirname, '..', book.img_url);
                    await fs.unlink(oldPath).catch(console.error);
                }
                updates.img_url = `/uploads/books/${req.file.filename}`;
            }

            await book.update(updates);
            return res.status(200).json({ book });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в patch, Book_controller", error });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const book = await db.Books.findByPk(id);
            if (!book) {
                return res.status(404).json({ message: "Книга не найдена" });
            }

            if (book.img_url) {
                const filePath = path.join(__dirname, '..', book.img_url);
                await fs.unlink(filePath).catch(console.error);
            }

            await book.destroy();
            return res.status(200).json({ message: "Книга успешно удалена", status: true });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в delete, Book_controller", error });
        }
    }
}

module.exports = new Book_controller();
