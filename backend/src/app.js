import express from "express"
import cors from "cors"
const app = express()
app.use(cors({
    origin:['http://localhost:5173','https://680cb75b50e613e32d245900--idyllic-gelato-6f272a.netlify.app'],
    credentials:true
}))
app.use(express.json())

export default app