const mongoose=require('mongoose')
const config=require('../utils/config')

const UserSchema= new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        
    }

})




module.exports=mongoose.model('User',UserSchema)