const express=require('express')
const app=express()
const cors = require('cors')
const loginRouter=require('./controllers/login.js')
const usersRouter=require('./controllers/users.js')
const router=require('./controllers/list.js')
const mongoose=require('mongoose')
const config=require('./utils/config.js')
const middleware=require('./utils/middleware')




console.log('here is app.js');
console.log("linke",config.MONGODB_URI);
const conn=mongoose.connect(config.MONGODB_URI)
        .then((result) => {
            console.log('connected to MongoDB')
        })
        .catch(error=>{
            console.log(error);
        })
        

//console.log("router",router);
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
//console.log("try");
app.use(middleware.getToken)
app.use(middleware.getUser)
app.use(loginRouter)
app.use(usersRouter)
app.use(router)
console.log("ending of app.js");

module.exports=app