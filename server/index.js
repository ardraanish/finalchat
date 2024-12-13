const express   =require("express")
const cors = require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDB")
const router  = require("./routes/route")
const {app,server} = require("./socket/index")

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8080


app.use(router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("Server  runnig at " + PORT);
    })
})


