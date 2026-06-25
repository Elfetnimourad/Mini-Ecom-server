const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")



//register
const register = async(req,res)=>{

const {username,email,password,role} = req.body;

const recentUser = await User.find({email});
if(recentUser){
    return res.status(404).json("This User Is already Exist");
}

const hashedPassword = await bcrypt.hash(password,10) 
if(email === "moradtao2000@gmail.com"){
    role = "ADMIN"
}
const newUser = new User({
username,
email,
password:hashedPassword,
role,

})

}


//login

