import app from "./app.js";
import MongoDB from "../mongodb/index.js";
import router from "../route/index.js";
// import sendmail from "sendmail"



await MongoDB()


app.use('/',router)

app.listen(8080,()=>{
    console.log('Server runnning at :8080')
})