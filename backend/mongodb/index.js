import mongoose from "mongoose"
import AsyncHandler from "../utils/AsyncHandler.js"
import dotenv from "dotenv"


dotenv.config({
    path:'.env'
})
const MongoDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MongoDBurl)
        console.log('Connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default MongoDB