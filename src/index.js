require("dotenv").config();
const express = require("express");
const sequelize = require("./database");
const models = require("./models/models");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middlewares/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static/images")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started. Port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();