const express = require("express");
const cors = require("cors");
const { candidateDetails } = require("./src/controllers/candidate.controller");
const { upload } = require("./src/middlewares/multer.middleware");
const app = express();

app.use(cors({
    origin:[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        process.env.FRONTEND_URL
    ],
    credentials : true
}));

//to catch json data 
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.post("/api/candidate-info",
     upload.fields([
        {
            name: "resume",
            maxCount: 1
        }
    ]),candidateDetails)

module.exports = app;
