require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

//import routes
const userRoute = require("./routers/user")
const questionRoute = require("./routers/question");
const answerRoute = require("./routers/answer");

const authRoute = require("./routers/auth");

//middlewares
app.use(bodyParser.json());
app.use(cors());
//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log("DB connected");
    });

//routes
app.use("/api", userRoute);
app.use("/api", questionRoute);
app.use("/api", answerRoute);
app.use("/api", authRoute);

//port
const port = process.env.PORT || 8000;
// server
app.listen(port, () => {
    console.log("Server is up and running....");
});
