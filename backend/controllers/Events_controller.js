const moment = require('moment-timezone');
const { db } = require("../models");

class Events_controller {
    async get(req, res) {
        try {
            const events = await db.Events.findAll();

            // Преобразуем дату каждого события в нужный часовой пояс (Asia/Almaty) перед отправкой
            const eventsWithFormattedDate = events.map(event => {
                const formattedDate = moment(event.date).tz('Asia/Almaty').format('YYYY-MM-DDTHH:mm:ss');
                return { ...event.toJSON(), date: formattedDate };
            });

            return res.status(200).json({ events: eventsWithFormattedDate });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в get, Events_controller", error });
        }
    }

    async post(req, res) {
        try {
            const { EventsName, date, description } = req.body;

            if (!EventsName || !date || !description ) {
                return res.status(400).json({ message: "Не все поля отправлены" });
            }

            // Преобразуем дату с учетом часового пояса (например, Asia/Almaty)
            const eventDate = moment.tz(date, 'Asia/Almaty').format('YYYY-MM-DD HH:mm:ss');

            // Проверка на дубликат
            const duplicate = await db.Events.findOne({
                where: { EventsName, date: eventDate }
            });

            if (duplicate) {
                return res.status(409).json({ message: "Такое событие уже существует" });
            }

            const event = await db.Events.create({ EventsName, date: eventDate, description });
            return res.status(201).json({ event });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в post, Events_controller", error });
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const event = await db.Events.findByPk(id);
            if (!event) {
                return res.status(404).json({ message: "Событие не найдено" });
            }

            // Проверка на дубликат, если меняются имя и дата
            if (updates.EventsName && updates.date) {
                const eventDate = moment.tz(updates.date, 'Asia/Almaty').format('YYYY-MM-DD HH:mm:ss');

                const duplicate = await db.Events.findOne({
                    where: {
                        EventsName: updates.EventsName,
                        date: eventDate
                    }
                });

                if (duplicate && duplicate.id !== Number(id)) {
                    return res.status(409).json({ message: "Событие с таким именем и датой уже существует" });
                }

                updates.date = eventDate; // Обновляем дату на новую с учетом часового пояса
            }

            await event.update(updates);
            return res.status(200).json({ event });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в patch, Events_controller", error });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const event = await db.Events.findByPk(id);
            if (!event) {
                return res.status(404).json({ message: "Событие не найдено" });
            }

            await event.destroy();
            return res.status(200).json({ message: "Событие успешно удалено" });
        } catch (error) {
            return res.status(500).json({ message: "Ошибка в delete, Events_controller", error });
        }
    }
}

module.exports = new Events_controller();
