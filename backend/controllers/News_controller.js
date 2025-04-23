const moment = require('moment-timezone');
const { db } = require("../models");
const fs = require('fs').promises;
const path = require('path');

class News_controller {
    async get(req, res) {
        try {
            const news = await db.News.findAll();
            return res.status(200).json({ news });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, News_controller", error });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const response = await db.News.findByPk(id);

            if (!response) {
                return res.status(200).json({ message: "О новости данные нету" })
            }
            return res.status(200).json({ news: response })
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, News_controller", error })
        }
    }

    async post(req, res) {
        try {
            // Получаем данные из FormData
            const NewsName = req.body.NewsName;
            const date = req.body.date;
            const description = req.body.description;

            console.log('Received data:', { NewsName, date, description, file: req.file });

            if (!NewsName || !date || !description) {
                // Если файл был загружен, удаляем его
                if (req.file) {
                    await fs.unlink(req.file.path).catch(console.error);
                }
                return res.status(400).json({
                    message: "Не все поля отправлены",
                    received: { NewsName, date, description }
                });
            }

            let img_url = null;
            if (req.file) {
                img_url = `/uploads/news/${req.file.filename}`;
            }

            const almaty_date = moment.tz(date, 'Asia/Almaty');

            const duplicate = await db.News.findOne({
                where: { NewsName, date: almaty_date.toDate() }
            });

            if (duplicate) {
                if (req.file) {
                    await fs.unlink(req.file.path).catch(console.error);
                }
                return res.status(409).json({ message: "Такая новость уже существует" });
            }

            const news = await db.News.create({
                NewsName,
                date: almaty_date.toDate(),
                description,
                img_url
            });

            return res.status(201).json({ news });
        } catch (error) {
            console.error('Error in post:', error);
            if (req.file) {
                await fs.unlink(req.file.path).catch(console.error);
            }
            return res.status(500).json({
                message: "Ошибка в post, News_controller",
                error: error.message
            });
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = {};

            // Получаем данные из FormData
            if (req.body.NewsName) updates.NewsName = req.body.NewsName;
            if (req.body.date) updates.date = req.body.date;
            if (req.body.description) updates.description = req.body.description;

            const news = await db.News.findByPk(id);
            if (!news) {
                if (req.file) {
                    await fs.unlink(req.file.path).catch(console.error);
                }
                return res.status(404).json({ message: "Новость не найдена" });
            }

            if (updates.date) {
                const almaty_date = moment.tz(updates.date, 'Asia/Almaty');
                updates.date = almaty_date.toDate();
            }

            if (req.file) {
                if (news.img_url) {
                    const oldFilePath = path.join(__dirname, '..', news.img_url);
                    await fs.unlink(oldFilePath).catch(console.error);
                }
                updates.img_url = `/uploads/news/${req.file.filename}`;
            }

            await news.update(updates);
            return res.status(200).json({ news });
        } catch (error) {
            console.error('Error in patch:', error);
            if (req.file) {
                await fs.unlink(req.file.path).catch(console.error);
            }
            return res.status(500).json({
                message: "Ошибка в patch, News_controller",
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const news = await db.News.findByPk(id);
            if (!news) {
                return res.status(404).json({ message: "Новость не найдена" });
            }

            if (news.img_url) {
                const filePath = path.join(__dirname, '..', news.img_url);
                await fs.unlink(filePath).catch(console.error);
            }

            await news.destroy();
            return res.status(200).json({ message: "Новость успешно удалена" });
        } catch (error) {
            return res.status(500).json({
                message: "Ошибка в delete, News_controller",
                error: error.message
            });
        }
    }
}

module.exports = new News_controller();
