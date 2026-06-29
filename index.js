require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.use(cors())

mongoose.connect("mongodb+srv://moradtao2000_db_user:moradelf1234@cluster0.dzddk8y.mongodb.net/mini-ecom?appName=Cluster0"
).then(()=>{
    console.log("DB IS READY")
})

app.listen("7000",()=>{ 
    console.log("Listenning on port 7000")
})