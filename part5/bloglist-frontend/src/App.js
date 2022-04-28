import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NoteForm from './components/noteForm'
import blogPart from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [errorMessage,setErrorMessage]=useState(null)
  const [newMessage,setNewMessage]=useState(null)
  const [visible, setVisible]=useState(null)
  const [singleVisible, setSingleVisible]=useState(999)
  const [likeId, setlikesId]=useState('')
  const [singleReview, setsingleReview]=useState(false)
  
  const Notification = ({ message }) => {
    const wrongStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: 16  
    }
    
  
    return (
      <div style={wrongStyle}>
        {message}
      </div>
    )
  }



  
const  t = [{v: 1}, {v: 2}, {v: 3}]
console.log("sum ", t.map(o => o.v).reduce((s, o) => s + o.v, 0)  );


  console.log("let me stydt");
  useEffect(() => {
    console.log("front check the user", blogs);
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  console.log("when is print");

  useEffect(()=>{
    const loggedUser=window.localStorage.getItem('blogUser')
    if(loggedUser){
      const user=JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const addBlog=(event)=>{
    event.preventDefault()
    
    const blogObject={
      title: title,
      author:author,
      url: url

    }
    blogService.create(blogObject)
              .then(returnedobject=>{
              
              setBlogs(blogs.concat(blogObject))
              })
    setNewMessage(`a new blog ${title} by ${author} added`)      
    setTimeout(() => {setNewMessage(null)}, 5000)
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    
}

const addLikes =(blog)=>{
  //blog.preventDefault();
  console.log("here is front end likes");
  //event.preventDefault()
  console.log("total blogs list",blogs)
  console.log("try",blog);
  //
  const newLikes=blog.likes+1
  
  console.log("id",blog.user);
  const updateObject={
    user: blog.user,
    likes: newLikes,
    author: blog.author,
    title: blog.title,
    url: blog.url

  }
  blogService.update(blog.id,updateObject)



}

const blogDelete=(blog)=>{
  console.log("here is front end delete");
  const message=`Remove blog ${blog.title} by ${blog.author} `
  
  /*
  if (window.confirm(message)){
    //blogService.deleteOne(blog.id)
  }
  */
  
}

const handleLogin=async(event)=>{
  event.preventDefault()
  try{
  const user= await loginService.login({
    username,password
  })
  console.log("chceck the user.name", user.username)
  blogService.setToken(user.token)
  window.localStorage.setItem("blogUser", JSON.stringify(user))
  setUser(user)
  console.log("userss",user)
} catch(expection){
  console.log("if the eroor ");
  setErrorMessage('Wrong user or password')      
  setTimeout(() => {setErrorMessage(null)}, 5000)
  console.log("the expection is ",expection);
}
}

const handleLogout=(event)=>{
  //event.preventDefault()

  window.localStorage.removeItem("blogUser")
  setUser(null)
  setUsername('')
  setPassword('')
}



 const loginForm=()=>{


  
   return(
  <div>

  
  <h2>log in to application</h2>
  <Notification message={errorMessage} />
    <form onSubmit={handleLogin} >
      <div>
        username 
        <input type="text" value={username} name='Username'
        onChange={({target}) => setUsername(target.value)} />
        <div>
        password
        <input type="text" value={password} name='Password'
        onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
      </div>
    </form>
    <br></br>
    </div>
    
 )
   }
//newMessage needs more docorations
 const blogPart =()=>(
  <div>
    <h2>blogs</h2>
    <div>{newMessage}</div> 
    <div>{username} logged in  {''}
    <button onClick={handleLogout} type="submit">logout</button>
    </div>
   
    </div>

)

const finalNotePart=()=>{
  const hideWhenVisible={display: visible ? 'none': ''}
  const showWhenVisible={display: visible ? '': 'none'}
  blogs.sort((a,b)=>a.likes-b.likes)

const propsInfo={
  author: author,
  url:url,
  title: title
}
  return(
  <div>
   <div>{blogPart()}</div>
   <div style={hideWhenVisible}><button onClick={()=> setVisible(true)}>create new blog</button></div>
   <div style={showWhenVisible}>
   <NoteForm  props={propsInfo} 
    handleAuthor={({target})=>setNewAuthor(target.value)} handleTitle={({target})=>setNewTitle(target.value)} 
    handleUrl={({target})=>setNewUrl(target.value)} addBlog={addBlog} 
    />
  </div>
  <div style={showWhenVisible}><button onClick={()=> setVisible(false)}>cancel</button></div>
  <div>
    {blogs.map((blog,i) =>
      
      (singleVisible !==i)
      
      ?<BlogShort key={i} blog={blog} visibleHandler={()=>setSingleVisible(i)}/>
      :<BlogLong key={i} blog={blog} user={user} visibleHandler={()=>setSingleVisible(999)} 
        deleteBlog={blogDelete} increaseLikes={addLikes} />
      
      )} 
  </div>
  </div>
)
}

//blogs.sort((a,b)=>a-b)


  return (
    
    <div>
      
      <div>
      {user ===null ? 
      loginForm():
      finalNotePart()
      }
    
      </div>

      

    </div>
    

  )
}




const BlogShort=({blog, visibleHandler})=>{
  
  BlogShort.propTypes={
    blog: PropTypes.object.isRequired,
    visibleHandler: PropTypes.func.isRequired    
  }
  
  
  return (
    <div>
    {blog.title} {''}{blog.author} {''}
    <button onClick={visibleHandler}>view</button>
    </div>

  )
}

const BlogLong=({blog, user, visibleHandler,singleReviewHandler, increaseLikes,deleteBlog})=>{
  console.log("here is frontend bloglong")
  const removeStyle={
    background:'blue'

  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
    <div>{blog.title}{' '}{blog.author}  <button onClick={visibleHandler}>hide</button></div>
    <div>{blog.url}</div>
    <div>likes{' '}{blog.likes}<button onClick={increaseLikes(blog)}>like</button></div>
    <div>{user.username}</div>
    <div><button style={removeStyle} onClick={deleteBlog(blog)}>remove</button></div>
    </div>

  )
}

export default App