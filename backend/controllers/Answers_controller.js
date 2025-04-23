const { db } = require("../models");

class Answers_controller {
    async get(req, res) {
        try {
            const answers = await db.Answers.findAll();
            return res.status(200).json({ answers });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, Answers_controller", error });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const answers = await db.Answers.findByPk(id);
            return res.status(200).json({ answers });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, Answers_controller", error });
        }
    }


    async post(req, res) {
        try {
            const { questionId, answer, adminId, typeId } = req.body;

            if (!questionId || !answer) {
                return res.status(400).json({ message: "Не все поля отправлены" });
            }

            const admin = await db.Admin.findByPk(adminId);
            if (!admin) {
                return res.status(401).json({ message: "Админ не существует" });
            }

            const question = await db.Question.findByPk(questionId);
            if (!question) {
                return res.status(400).json({ message: "Вопроса нету в базе" });
            }

            const newAnswers = await db.Answers.create({ questionId, answer, adminId, typeId });
            return res.status(201).json({ answer: newAnswers });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в post, Answers_controller", error });
        }
    }


    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const answer = await db.Answers.findByPk(id);
            if (!answer) {
                return res.status(404).json({ message: "Ответ не найден" });
            }

            await answer.update(updates);
            return res.status(200).json({ answer });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в patch, Answers_controller", error });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const answer = await db.Answers.findByPk(id);
            if (!answer) {
                return res.status(404).json({ message: "Ответ не найден" });
            }

            await answer.destroy();
            return res.status(200).json({ message: "Ответ успешно удалён" });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в delete, Answers_controller", error });
        }
    }
}

module.exports = new Answers_controller();
