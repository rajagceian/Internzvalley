const mongoose = require("mongoose");

function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    }catch(err){
        console.log("Error in connecting DB : ",err.message);
    }
}

module.exports  = {connectDB};