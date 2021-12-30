const router=require('express').Router()
const { response } = require('express');
const Blog=require('../models/model.js')
const jwt=require("jsonwebtoken")
const User = require('../models/user')
const bcrypt=require('bcrypt')

console.log("here is list.js");



router.get('/api/blogs', async(request, response) => {
  console.log("hello there");
  const result=await Blog.find({})
  response.status(200).json(result)

})

router.post('/api/blogs', async(request, response) => {
  console.log("its post test");
  const body=request.body
  console.log("check the poost body", body);
  //const token=getToken(request)
    const correct=jwt.verify(request.token,"password")
    if (!correct|| !request.token){
        return response.status(401).json({ error: 'token missing or invalid' })
    }
  
  if( typeof body.likes==='undefined') {
    console.log("returnef", body);   
    body['likes']=0
  }
  console.log("check the body 2", body);
  const user = await User.findById(correct.id)
  const blog =new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id

  })

  const savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog.id)
  await user.save()
  response.json(savedBlog)

  
  
})

router.delete('/api/blogs/:id', async (request, response,next)=>{
  try {
    console.log("here is delete backend", request.token);
    const compare=jwt.verify(request.token, process.env.PASS)
    console.log("compare id", compare.id);
    if(!compare|| !request.token){
      return rep.status(401).json({ error: 'token missing or invalid' })
    }
    const blog= await Blog.findById(request.params.id)
    console.log("blog id", blog.user);
    const check=blog.user.toString()===compare.id
    console.log("check is ", check);
    if(!check){
      console.log("where are u");
      return response.status(401).json({ error: 'invalid token' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

    
  }catch(error){
    next(error)
  }
  
})

router.put('/api/blogs/:id', async (request, response,next)=>{
  try {
    console.log("here is put in the backend");
    const body=request.body
    console.log("heiiu",body);
    
    const oldone= await Blog.findById(request.params.id)
    console.log("check the changes", oldone);
    console.log("body ok?",body.likes);
    oldone.likes=body.likes
    
    console.log("check the new changes", oldone);
    await Blog.findByIdAndUpdate(request.params.id,oldone,{new: true})
    response.status(204).end()
    
  }catch(error){
    next(error)
  }
  
})

/*
router.put('/api/blogs/:id', async (request, response,next)=>{
  try {
    console.log("here is put in the backend");
    const body=request.body
    console.log("heiiu",body);
    
    const oldone= await Blog.findById(request.params.id)
    console.log("check the changes", oldone);
    //console.log("body ok?",body.likes);
    oldone.user=body.user
    
    console.log("check the new changes", oldone);
    await Blog.findByIdAndUpdate(request.params.id,oldone,{new: true})
    response.status(204).end()
    
  }catch(error){
    next(error)
  }
  
})
*/





module.exports=router