import express from "express"
import cors from "cors"
const app = express()
app.use(cors({
    origin:['http://localhost:5173','https://680cbb6d706ffc0008dd2aa5--idyllic-gelato-6f272a.netlify.app/'],
    credentials:true
}))
app.use(express.json())

export default app