const { Op } = require("sequelize");
const { db } = require("../models");

class Question_controller {
    async get(req, res) {
        try {
            const questions = await db.Question.findAll({
                include: [
                    {
                        model: db.Answers, // Для получения всех ответов
                        as: 'Answer',     // Alias для ассоциации
                        include: [
                            {
                                model: db.Types, // Подключение модели типа
                                as: 'Type',      // Alias для типа
                                attributes: ['id', 'title'], // Указание полей, которые нужно вернуть
                            }
                        ]
                    }
                ]
            });

            return res.status(200).json({ questions });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, Question_controller", error });
        }
    }



    async getWithAnswers(req, res) {
        try {
            const { query, typeId } = req.query;

            const whereQuestion = {};
            const whereAnswer = {};

            if (query) {
                // Определяем мягкий поиск по Question или answer
                whereQuestion[Op.or] = [
                    { Question: { [Op.iLike]: `%${query}%` } },
                    { '$Answer.answer$': { [Op.iLike]: `%${query}%` } } // доступ к полю в include
                ];
            }

            if (typeId) {
                whereAnswer.typeId = Number(typeId);
            }

            const questions = await db.Question.findAll({
                where: whereQuestion,
                include: [
                    {
                        model: db.Answers,
                        as: 'Answer',
                        where: Object.keys(whereAnswer).length ? whereAnswer : undefined,
                        required: true,
                        include: [
                            {
                                model: db.Types,
                                as: 'Type',
                                attributes: ['id', 'title']
                            }
                        ]
                    }
                ]
            });

            if (!questions.length) {
                return res.status(404).json({ message: "Вопрос не найден" });
            }

            return res.status(200).json({ questions });

        } catch (error) {
            console.error("Ошибка в getWithAnswers:", error);
            return res.status(500).json({ message: "Ошибка в getWithAnswers", error });
        }
    }




    async post(req, res) {
        try {
            const { Name, LastName, Question } = req.body;

            if (!Name || !LastName || !Question) {
                return res.status(400).json({ message: "Не все поля отправлены" });
            }

            const newQuestion = await db.Question.create({ Name, LastName, Question });
            return res.status(201).json({ newQuestion });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в post, Question_controller", error });
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const question = await db.Question.findByPk(id);
            if (!question) {
                return res.status(404).json({ message: "Вопрос не найден" });
            }

            await question.update(updates);
            return res.status(200).json({ question });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в patch, Question_controller", error });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const question = await db.Question.findByPk(id);
            if (!question) {
                return res.status(404).json({ message: "Вопрос не найден" });
            }

            await question.destroy();
            return res.status(200).json({ message: "Вопрос успешно удалён" });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в delete, Question_controller", error });
        }
    }
}

module.exports = new Question_controller();
