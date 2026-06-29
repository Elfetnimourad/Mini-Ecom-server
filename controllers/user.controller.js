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
const token = jwt.sign({username:newUser.username,email:newUser.email,password:newUser.password,role:newUser.role},"77b4b5afdebcb8322d2ad2fc62188aaaff95e895549ba033cd4d80d4c2589ac4")

newUser.token = token;
await newUser.save();
}


//login

const login = async(req,res)=>{
    const {email,password} = req.body;
const user = await User.findOne({email});
if(!user){
    return res.status(404).json("You Have To Sign")
}

if(!email && !password){
    return res.status(404).json("Email & password are not Valid")
}
const comparedPassword = await bcrypt.compare(password,user.password);
try{
if(comparedPassword && user){
    const token = jwt.sign({username:user.username,email:user.email,password:user.password,role:user.role},"77b4b5afdebcb8322d2ad2fc62188aaaff95e895549ba033cd4d80d4c2589ac4")
user.token = token;
return res.status(201).json({user})
}
}catch(error){
return res.status(404).json(error)
}

}
module.exports = {
    register,
    login
}