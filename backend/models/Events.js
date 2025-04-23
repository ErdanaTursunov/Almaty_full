const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Events = sequelize.define("Events", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    EventsName: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Events;