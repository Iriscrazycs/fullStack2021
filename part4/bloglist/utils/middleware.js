const { request } = require('express')
const jwt=require('jsonwebtoken')

const getToken=(res,rep, next)=>{
    const authorization = res.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        res.token= authorization.substring(7)  
    }  
    next()
  }

const getUser=(res,rep, next)=>{
    const authorization = res.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        const token= authorization.substring(7)
        const result=jwt.verify(token, process.env.PASS)
        request.user=result.id
    }
    
    next()

}


module.exports={
    getToken:getToken,
    getUser: getUser
}
  