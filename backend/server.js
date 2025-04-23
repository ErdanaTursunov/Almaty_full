require("dotenv").config();
const sequelize = require("./db");
const router = require("./routes/router");
const cors = require("cors")

const express = require("express")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use("/api", router);


const start = async () => {
    try {

        await sequelize.authenticate();
        console.log("База данных подключен!");
        

        // await sequelize.sync({alter: true})
        app.listen(PORT, () => {
            console.log(`Успешно запущен ${PORT}`)
        })
    } catch (error) {
        console.log("Ошибка в сервере", error);
    }
}


start();