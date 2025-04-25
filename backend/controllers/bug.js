import upload from "../middleware/index.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
const imageupload = AsyncHandler(async(req,res)=>{
    const file = req.files[0]
    const path = file.path
    cloudinary.config({ 
        cloud_name: 'dmbiqpg0z', 
        api_key: '777934722256838', 
        api_secret: 'rKJu2PhFLImXhA7MswGNp7JP7AI' 
    });
    const uploaded = await cloudinary.uploader.upload(path)
    // console.log(uploaded)
    fs.unlinkSync(path)
    res.send(uploaded.secure_url)
})

export default imageupload