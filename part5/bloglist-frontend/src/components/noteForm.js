const NoteForm=({props,handleTitle,handleAuthor, addBlog})=>{
    return (
      
    <div>
      <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
      title:
      <input
        value={props.title}
        onChange={handleTitle}
      /></div>
      <div>
      author:
      <input
        value={props.author}
        onChange={handleAuthor}
      /></div>
      <div>
      url:
      <input
        value={props.url}
        onChange={props.handleUrl}
      /></div>
      <button type="submit">create</button>
      <p>{props.title} {props.author}</p>
    </form>
    
    </div>)
  }

export default NoteForm