const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Books = sequelize.define("Books", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false }, // Оставляем только один title
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    Genr: { type: DataTypes.STRING, allowNull: true },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_url: { type: DataTypes.STRING, allowNull: true }
});



module.exports = Books;
