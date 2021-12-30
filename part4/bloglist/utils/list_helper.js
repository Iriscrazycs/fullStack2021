const dummy = (blogs) => {
    // ...
    return 1;
  }


const totalLikes=(blogs)=>{
    const sum =blogs.map(x=> x.likes)
                 .reduce(((sum,newValue)=>sum+newValue))

    
    
    return sum/blogs.length

}

const favoriteBlog=(blogs)=>{
    var max=blogs[0]
    var number=0;
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].likes>max) {
            max= blogs[i].likes
            number=i
    }

    const obj={
        title: blogs[number].title,
        author: blogs[number].author,
        likes: blogs[number].likes
    }
    return obj
}
}
  
  module.exports = {
    dummy,totalLikes,favoriteBlog
  }