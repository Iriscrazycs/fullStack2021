const mongoose = require('mongoose')
const supertest=require('supertest')
const app=require('../app')

const api=supertest(app)


test('getting data from blogs api', async()=>{
    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('if id parameter exist', async()=>{
    const response =await api.get("/api/blogs")
    //console.log('tyr',response.body[0]);
    expect(response.body[0].id).toBeDefined()
})

test('send data to blogs api', async()=>{
    const initialLength =await (await api.get("/api/blogs")).body.length

    const newNote={
        "title": "moi",
        "author": "yang",
        "url": "www.ooo.com",
        "likes": 3
      }
     //const initialLength=2 
    
    await api
        .post("/api/blogs")
        
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inc2NjYiLCJpZCI6IjYxYjYwMGE2Y2RmZTFhMzFlOWEyYzgxYSIsImlhdCI6MTYzOTMzMzk3OX0.IWkA2ZzGLUKDRAk6iJextVDS26il6X_La9SQSnsnxGI')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response =await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialLength+1)

})

/*test('test missing likes', async()=>{
    const initialLength =await (await api.get("/api/blogs")).body.length

    const newNote={
        "title": "yes",
        "author": "ypp",
        "url": "www.teto.com",
        
      }
    
    await api
      .post("/api/blogs")
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/) 
    
    const response =await (await api.get("/api/blogs")).body[initialLength]
    console.log("get the new data",response);
    expect(response.likes).toBe(0)

})

test('test missing title and url', async()=>{
    //const initialLength =await (await api.get("/api/blogs")).body.length

    const newNote={
        
        "url": "www.teto.com",
        "likes": 2
      }
    
    await api
      .post("/api/blogs")
      .send(newNote)
      .expect(400)
      //.expect('Content-Type', /application\/json/) 
    

})

test('send data without token', async()=>{
  const initialLength =await (await api.get("/api/blogs")).body.length

    const newNote={
        "title": "moi",
        "author": "yang",
        "url": "www.ooo.com",
        "likes": 3
      }
     //const initialLength=2 
    
    await api
        .post("/api/blogs")
        .send(newNote)
        .expect(401)
        //.expect('Content-Type', /application\/json/)
    
    const response =await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialLength)

})
*/



afterAll(() => {
    mongoose.connection.close()
  })