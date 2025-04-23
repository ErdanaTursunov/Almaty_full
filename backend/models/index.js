const Admin = require("./Admin")
const Answers = require("./Answers")
const Books = require("./Books")
const Events = require("./Events")
const News = require("./News")
const Question = require("./Question")
const Types = require("./Types")

const db = {
    Books,
    Events,
    News,
    Question,
    Answers,
    Admin,
    Types,
}

module.exports = { db }