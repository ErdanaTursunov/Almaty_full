const express = require("express");
const Question_controller = require("../controllers/Question_controller");
const checkAdmin = require("../middleware/checkAdmin");
const question_router = express.Router();


question_router.get("/", Question_controller.get);

question_router.get("/QuestionTrue", Question_controller.getWithAnswers);

question_router.post("/", Question_controller.post);

question_router.patch("/:id", checkAdmin, Question_controller.patch);

question_router.delete("/:id", checkAdmin, Question_controller.delete);


module.exports = question_router;
