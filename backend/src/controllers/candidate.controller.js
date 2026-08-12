const { Candidate } = require("../models/candidate");
const { ApiError } = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadOnCloudnary } = require("../utils/cloudinary");

async function candidateDetails(req,res){
    try{
        const {            name,
            email,phoneNumber,whatsappNumber,
            collegeName,
            registrationNumber,
            branch,
            passoutYear} = req.body;
        const fixedSize = 5*1024*1024; // max 5MB
        const photoLocalPath = req.files?.photo[0]?.path;
        const resumeLocalPath = req.files?.resume[0]?.path;
        if(!photoLocalPath){
            throw new ApiError(400,"Photo is required");
        }
        if(!resumeLocalPath){
            throw new ApiError(400,"Resume is required");
        }
        if(req.files?.photo[0].size>fixedSize || req.files?.resume[0].size>fixedSize){
            throw new ApiError(400,"File size should be less than 5MB");
        }
        //------ upload on cloudinary ----------
        const photo = await uploadOnCloudnary(photoLocalPath);
        const resume = await uploadOnCloudnary(resumeLocalPath);
        if(!photo){
            throw new ApiError(400,"Photo is required");
        }
        if(!resume){
            throw new ApiError(400,"Resume is required");
        }
        await Candidate.create({
            name,
            email,
            phoneNumber,
            whatsappNumber,
            collegeName,
            registrationNumber,
            branch,
            passoutYear,
            photo:photo.url,
            resume:resume.url
        })
        res.status(201).json(
            new ApiResponse(201,"Information collected successfull")
        );
    }catch(err){
        console.log("Error in controller : ",err.message);
        res.status(500).json({
            message : "Internal Server Problem"
        })
    }
}

module.exports = {candidateDetails};