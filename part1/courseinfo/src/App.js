import React from 'react'

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  
  
  return (
    <div>
      
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}


const Header =(header) =>{
  return (
    <div>
      <p>
      {header.course}
      </p>

    </div>
  )
}

const Content =(content1) =>{
  return (
    <div>
      <p>
      <Part name={content1.parts[0].name} exercises={content1.parts[0].exercises}/>
      <Part name={content1.parts[1].name} exercises={content1.parts[1].exercises}/>
      <Part name={content1.parts[2].name} exercises={content1.parts[2].exercises}/>
      </p>

    </div>
  )
}

const Part =(part) =>{
  return (
    <div>
      <p>
      {part.name}: {part.exercises}
      </p>
    </div>
  )
}

const Total =(totalN) =>{
  const sumUp =(obj) =>{
    const a=obj.parts[0].exercises+obj.parts[1].exercises+obj.parts[2].exercises;
    return a

  }
  const sum=sumUp(totalN);

  return (
    <div>
      <p>
      
      Number of exercises: {sum}
      </p>

    </div>
  )
}
export default App