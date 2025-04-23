const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: {
        type: Sequelize.ENUM('admin'),
        allowNull: false,
        defaultValue: 'admin',  // Устанавливаем дефолтное значение
    },

})

module.exports = Admin;