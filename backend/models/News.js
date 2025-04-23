const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const News = sequelize.define("News", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NewsName: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    img_url: { type: DataTypes.STRING, allowNull: true }
});

module.exports = News;