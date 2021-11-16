const mongoose = require('mongoose')

const password= process.argv[2]


console.log(password);
const url=`mongodb://fullstack:${password}@cluster0-shard-00-00.e9xbg.mongodb.net:27017,cluster0-shard-00-01.e9xbg.mongodb.net:27017,cluster0-shard-00-02.e9xbg.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-rnv2cc-shard-0&authSource=admin&retryWrites=true&w=majority`



mongoose.connect(url)
console.log("connection is good");
const numberSchema= new mongoose.Schema({
    name: String,
    number: String
})

const Book=mongoose.model('Book',numberSchema)

console.log("schema is good");


if (process.argv.length<=3){
    console.log("phonebook");
    Book.find({}).then(result=>{
        result.forEach(book=>{
            console.log(book.name+" "+book.number)
        })
        mongoose.connection.close()
    })
    
}else{

    const nameInput= process.argv[3]
    const numberInput= process.argv[4]
    const phone =new Book ({
        name:nameInput,
        number:numberInput
    
    })
    console.log("is phone is ok?",phone);
    phone.save().then(result=>{
        mongoose.connection.close()
    })
    

}
