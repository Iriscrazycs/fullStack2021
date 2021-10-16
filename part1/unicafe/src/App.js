import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1> 
      <p>
      <button onClick={()=> setGood(good+1)} >good</button>
        
      <button onClick={()=> setNeutral(neutral+1)} >neutral</button>

      <button onClick={()=> setBad(bad+1)} >bad</button>
      </p>
      
      <h1>
        statistics
      </h1>

        
        <Statistics data1={good} data2={neutral} data3={bad}></Statistics>

    </div>
  )
}



const Statistics = (props) =>{
  
  const count=(props.data1+props.data2+props.data3)
  const sum=(props.data1+props.data2*0+props.data3*-1)
  const average=sum/count
  const positive=props.data1/count*100
  if (props.data1 >0 || props.data2 >0 || props.data3 >0 ) {
    return (
      <table>
       
        <StatisticLine text="good" value={props.data1}></StatisticLine>
    
        
        <StatisticLine text="neutral" value={props.data2}></StatisticLine>
        
        
        <StatisticLine text="bad" value={props.data3}></StatisticLine>
        
        <StatisticLine text="all" value={count}></StatisticLine>
        
        <StatisticLine text="average" value={average}></StatisticLine>
        
        <StatisticLine text="positive" value={positive} sign="%"></StatisticLine> 
      </table>
    )
  }
  return (
    
      <div>
        No feedback given
      </div>
  )
  
  
    
}

const StatisticLine =(props) =>{
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
      {props.value} 
      </td>
      <td>
      {props.sign}
      </td>
       
    </tr>
  )
}



const Aver =(props) =>{
  

  const average=props.sum/props.count
  return (
    <div>
      {}
      average {average}
    </div>
  )
}

const Sum =(props) =>{
  
  return (
    <div>
      all {props.sum}
    </div>
  )
}

const Posi =(props) =>{
  const posi=(props.data/props.count)*100
  return (
    <div>
    positive {posi}%
    </div>
  )
}



export default App