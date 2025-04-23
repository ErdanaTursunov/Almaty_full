const { db } = require("../models");

class TypesController {
    async get(req, res) {
        try {
            const types = await db.Types.findAll();
            return res.status(200).json({ types });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при получении типов", error: error.message });
        }
    }


    async post(req, res) {
        try {
            const { title } = req.body;

            if (!title) {
                return res.status(400).json({ message: "Поле 'title' обязательно" });
            }

            const duplicate = await db.Types.findOne({ where: { title } });
            if (duplicate) {
                return res.status(409).json({ message: "Такой тип уже существует" });
            }

            const type = await db.Types.create({ title });
            return res.status(201).json({ type });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при создании типа", error: error.message });
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;

            const type = await db.Types.findByPk(id);
            if (!type) {
                return res.status(404).json({ message: "Тип не найден" });
            }

            if (title) {
                const duplicate = await db.Types.findOne({ where: { title } });
                if (duplicate && duplicate.id !== Number(id)) {
                    return res.status(409).json({ message: "Тип с таким названием уже существует" });
                }
                type.title = title;
            }

            await type.save();
            return res.status(200).json({ type });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при обновлении типа", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const type = await db.Types.findByPk(id);

            if (!type) {
                return res.status(404).json({ message: "Тип не найден" });
            }

            await type.destroy();
            return res.status(200).json({ message: "Тип успешно удалён" });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при удалении типа", error: error.message });
        }
    }
}

module.exports = new TypesController();
