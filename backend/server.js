require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./src/db/connectDB");


const POST = process.env.PORT || "5000";

connectDB();

app.listen(POST,()=>{
    console.log("Server started....");
})