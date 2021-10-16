import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
 
  
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0,0,0,0,0,0,0])


  const RandomNumber =() =>{
    const number= Math.floor(Math.random()*6)
    
    setSelected(number)
    
  }

  const Vote =() =>{
    console.log(vote)
    const copy=[...vote]
    copy[selected]++
    setVote(copy)

    

  }
  var a=0
  for(var i=0; i<vote.length;i++){
    
    if(vote[i]>=vote[a]){
      console.log(i)
      a=i
    }

  }
  console.log("after change"+a)


  
  
  

  return (
    <div>
      <h1>
       Anecdote of the day
      </h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {vote[selected]} votes
      </div>
      <div>
      <button onClick={Vote}>vote</button>
      <button onClick={RandomNumber}>next anecdote</button>
      
      </div>
      <h1>
      Anecdote with the most votes
      </h1>
      <div>
        {anecdotes[a]}
      </div>
      <div>
        has {vote[a]} votes
      </div>
    </div>
  )
}



export default App