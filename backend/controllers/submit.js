import mongoose, {Schema} from "mongoose"
import AsyncHandler from "../utils/AsyncHandler.js"

const Submit = new Schema({
    fullname:{
        type:String,
        require : true
    },
    email:{
        type:String,
        require :true
    },
    image:{
        type:String,
        default:null
    },
    type:{
        type:String
    },
    message:{
        type:String
    }

},{
    timestamps:true
})
const SubmitSchema =  mongoose.model('submitions',Submit)

const submit = AsyncHandler(async(req,res)=>{
    let{fullname, email , image , message , type} = req.body;
    if(type==1){
        type = 'Bug'
    }
    else if(type==2){
        type = 'Feature'
    }
    else if(type==3){
        type= "Feedback"
    }
    const newsubmit = new SubmitSchema({
        fullname:fullname,
        email:email,
        image:image,
        type:type,
        message:message
    })
    await newsubmit.save()
    res.send(newsubmit)
})

const allsubmits = AsyncHandler(async(req,res)=>{
    let allsubmit = await SubmitSchema.find({})
    res.send(allsubmit)
})

export  {submit , allsubmits}