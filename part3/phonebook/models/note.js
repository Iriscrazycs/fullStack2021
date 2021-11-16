const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
require('dotenv').config()
const password= process.argv[2]


console.log(password);
const url=process.env.MONGODB_URI



mongoose.connect(url)
console.log("connection is good");
const numberSchema= new mongoose.Schema({
    name: {type: String, unique:true, minlength: 3
    },
    number: {type: String, unique:true, minlength:8
    }
})

numberSchema.plugin(mongooseUniqueValidator)

numberSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})



module.exports=mongoose.model('Book',numberSchema)

