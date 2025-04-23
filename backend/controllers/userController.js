const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('../models')
const { validationResult } = require('express-validator')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id: id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )
}


class UserController {

    // ********************************************************************************************************

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return next(ApiError.badRequest('Некорректные данные', errors.array()));
            }

            const { email, password, role = "admin", name } = req.body;

            // Проверка существующего пользователя
            const candidate = await db.Admin.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            // Хеширование пароля
            const hashPassword = await bcrypt.hash(password, 5);

            // Создание пользователя
            const admin = await db.Admin.create({
                name,
                email,
                role,
                password: hashPassword,
            });

            // Генерация токена
            const token = generateJwt(admin.id, admin.email, admin.role);

            return res.status(201).json({ token, admin: { id: admin.id, email: admin.email, role: admin.role } });
        } catch (err) {
            // Логирование ошибок и передача на middleware
            console.error('Ошибка регистрации:', err);
            return next(ApiError.internal('Ошибка на сервере'));
        }
    }

    // ********************************************************************************************************
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest('Email и пароль обязательны'));
            }

            const admin = await db.Admin.findOne({
                where: { email },
            });

            // Проверка пароля
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                return next(ApiError.badRequest('Неверный пароль'));
            }

            // Генерация токена
            const token = generateJwt(admin.id, admin.email, admin.role);

            // Возврат данных
            return res.status(200).json({
                token,
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                }
            });
        } catch (err) {
            // Логирование ошибки и передача на middleware
            console.error('Ошибка авторизации:', err);
            return next(ApiError.internal('Ошибка сервера при авторизации'));
        }
    }

}
module.exports = new UserController()