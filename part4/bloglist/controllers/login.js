const jwt = require('jsonwebtoken')
const express= require("express")
const loginRouter=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/user')


console.log("here is login");

loginRouter.post('/api/login', async(res,rep)=>{
    console.log("here is inside");
    const body=res.body
    console.log("body",body);
    const users= await User.find({})
    console.log("what is the usersssss", users);
    console.log("body name", body.username);
    const user= await User.findOne({username: body.username})
    console.log("check the user", user)
    console.log("what is the user", user.password);
    const correct=user===null
        ? false
        : await bcrypt.compare(body.password, user.password)
        console.log("here is first phrase");
    console.log("if correct", correct);
     
    if(!(user&&correct)){
        return rep.status(401).json({
            error:"invaild username or password"
        })
    }
    console.log("here is second phrase");
    const userToken={
        username: user.username,
        id: user.id
    }

    const token=jwt.sign(userToken,"password")
    console.log("token is ready", token);
    rep.status(200).send({token, username: user.username, name: user.name})


    
})


module.exports=loginRouter