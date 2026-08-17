const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
        unique: true
    },

    phoneNumber: {
      type: String,
      required: true
    },

    whatsappNumber: {
      type: String,
      required: true
    },

    collegeName: {
      type: String,
      required: true,
      trim: true
    },

    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },

    branch: {
      type: String,
      required: true
    },
    cgpa:{
        type:Number,
        required: true
    },
   
    passoutYear: {
      type: Number,
      required: true
    },

    photo: {
      type: String,
      required: true
    },

    resume: {
      type: String,
      required: true
    }
  },{timestamps : true});

const Candidate = mongoose.model("Candidate",candidateSchema);
module.exports = {Candidate};
