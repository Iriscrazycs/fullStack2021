

const express=require('express')
const app=express()
const morgan=require('morgan')
require('dotenv').config()
const Book=require('./models/note.js')
const mongoose=require('mongoose')


app.use(express.json())
morgan.token('custom', 'Server running on port 3001')

app.use(morgan('custom'))

morgan.token('body',(req)=> JSON.stringify(req.body))
app.use(morgan(':method :url :body'))
app.use(express.static('build'))


//Book.plugin(mongooseUniqueValidator)

let list=[
    { 
      'id': 1,
      'name': 'Arto Hellas', 
      'number': '040-123456'
    },
    { 
      'id': 2,
      'name': 'Ada Lovelace', 
      'number': '39-44-5323523'
    },
    { 
      'id': 3,
      'name': 'Dan Abramov', 
      'number': '12-43-234345'
    },
    { 
      'id': 4,
      'name': 'Mary Poppendieck', 
      'number': '39-23-6423122'
    }
]




app.get('/api/persons',(request,response,next) =>
    Book.find({}).then(number=>{
        
        response.end(JSON.stringify(number,null,2))
        //mongoose.connection.close()

    })
    .catch(error=>next(error))    

)

app.get('/info',(request,response,next) =>{
    //console.log('request',request.headers);
    Book.count()
        .then(result =>{
            response.end(`Phonebook has info for ${result} people`+'\n'+new Date())
        })
        .catch(error => next(error))

    
})

app.get('/api/persons/:id',(request,response,next) =>{
    const id1=(request.params.id)
    console.log( mongoose.Types.ObjectId.isValid(id1))
    console.log('this is ID', id1)
    Book.findById(id1).then(number=>{
        console.log(number);
        response.end(JSON.stringify(number,null,2))
        //mongoose.connection.close()
        
    })
    .catch(error=>next(error))
    
})

app.put('/api/persons/:id', (request,response,next) =>{
    const body=request.body
    const id = request.params.id
    const newNumber ={
        name: body.name,
        number: body.number

    }

    Book.findByIdAndUpdate(id, newNumber,{new: true})
        .then(updatedNote =>{
            response.json(updatedNote)
        })
        .catch(error=>next(error))
})

app.delete('/api/persons/:id',(request,response,next) =>{
    Book.findByIdAndRemove(request.params.id)
        .then(
            response.status(204).end()
        )
        .catch(error=> next(error))
    //const info=list.filter(person=> person.id!=id)
    


})


app.post('/api/persons',(req,res,next) =>{
    //console.log('hshd');
    const body=req.body
    //const number =Math.floor(Math.random() * 1000)
    //console.log('type',typeof(body.name));
    //console.log('number',number);
    //const array=list.filter(person=>person.name===body.name)

    console.log('body',body)
    //console.log('array',array);
    
    if (!body.name ){
        return res.status(404).json({
            error: 'name is missing'
        })
    }else if (!body.number ){
        return res.status(404).json({
            error: 'number is missing'
        })
    
    }else{
        const one=new Book({
            
            name:body.name,
            number:body.number
        })
        console.log('eroor');
        one.save()
        .then(list=>{
            console.log('eroor121');
            res.json(JSON.stringify(list,null,2))
        })
        .catch(error=>{
            console.log('hellp');
            next(error)})
        

    }
    
})


app.post('/api',(request,response)=>{
    const note=request.body
    console.log('check',note)
    response.json(note)
})

const errorHandler =(error,request,response,next) =>{
    if (error.name ==='CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }else if (error.name==='ValidationError'){
        console.log('hei')
        return response.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorHandler)


const PORT =process.env.PORT|| 3001
app.listen(PORT)