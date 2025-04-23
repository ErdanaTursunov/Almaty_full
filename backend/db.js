const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.PGHOST,
        port: '5432',
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false
        }
    }
)

module.exports = sequelize;