const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Question = require("./Question");
const Admin = require("./Admin");
const Types = require("./Types");

const Answers = sequelize.define("Answers", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Questions',
            key: 'id'
        }
    },
    answer: { type: DataTypes.STRING, allowNull: false },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Admins',
            key: 'id'
        }
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Types',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

// Associations
Question.hasOne(Answers, { foreignKey: "questionId", as: 'Answer' });  // Alias для Answers
Answers.belongsTo(Question, { foreignKey: "questionId" });

Answers.belongsTo(Admin, { foreignKey: "adminId" });
Admin.hasMany(Answers, { foreignKey: "adminId" });

Answers.belongsTo(Types, { foreignKey: "typeId", as: 'Type' });  // Alias для Types
Types.hasMany(Answers, { foreignKey: "typeId" });

module.exports = Answers;
