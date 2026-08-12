const { v2 : cloudinary } = require("cloudinary");
const fs = require("fs");
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});
    

const uploadOnCloudnary = async (localFilePath) =>{
    try{
        if(!localFilePath){
            console.log("Local path is Empty");
            return null;
        }
        //upload on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto" //image,video and audio
        })
        //console.log("File is uploaded successfully on cloudinary : ",res.url);
        fs.unlinkSync(localFilePath);
        return res;
    } catch(err){
        fs.unlinkSync(localFilePath);//remove the locally saved temporary files as the upload operation got failed
        console.log("Error in Uploading file on cloudinary : ",err.message);
        return null;
    } 
}


module.exports = {uploadOnCloudnary};