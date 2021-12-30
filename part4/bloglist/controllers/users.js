const express=require('express')
const userRouter =express.Router()
const User = require('../models/user')
const bcrypt=require('bcrypt')

const getToken=(request)=>{
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        return authorization.substring(7)  
    }  
    return null
}



userRouter.post('/api/users',async(res,rep,next)=>{
    try{
    
   
    const body=res.body
    if (body.password.length<3 || body.username.length<3 ){
       return rep.status(500).end("Both username and password must be at least 3 characters long")
    }
    const userId=await User.find({})
    
    const userColl=userId.map((name)=> (name.username))
    console.log("this userColl",userColl);
    if(userColl.includes(body.username)){
        console.log("hei no adding");
       return rep.status(500).end("The username is already registed.")
    }
    
    const hashPass=await bcrypt.hash(body.password, 10)
    const user=new User({
    username: body.username,
    name: body.name,
    password: hashPass,
    })

    const saved= await user.save()
    rep.json(saved)
    

    }catch(error){
        next(error)
    }

    
})

userRouter.get('/api/users', async(res,rep)=>{
    const idList=await User.find({}).populate('blogs')
    rep.json(idList)

})

module.exports=userRouter