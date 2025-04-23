const express = require("express");
const book_router = require("./book_router");
const events_router = require("./events_router");
const news_router = require("./news_router");
const question_router = require("./question_router");
const answers_router = require("./answers_router");
const userController = require("../controllers/userController");
const { validateRegistration } = require("../validators/registrationValidator");
const types_router = require("./types_router");
const router = express.Router();

router.use("/books", book_router)
router.use("/events", events_router)
router.use("/news", news_router)
router.use("/types", types_router)
router.use("/question", question_router)
router.use("/answers", answers_router)


router.post("/auth/signin", userController.login);
router.post("/auth/signup", validateRegistration, userController.registration);

module.exports = router;
