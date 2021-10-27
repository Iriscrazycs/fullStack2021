import React from "react";


const Header = ({ course }) => {
    console.log("course",course);
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    
    
    let sum = course.parts.reduce((accumulator, current)=>{
       
      return accumulator+current.exercises
      },0)
    console.log("sum is ",sum)
  
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ courses }) => {
    console.log("check if Content",courses);
    return (
      <div>
        {courses.parts.map(course =>
          <Part key={course.id} part={course}/>
  
        
        )}
        <Total  course={courses} />
        
  
      </div>
    )
  }
  
  const Course = ({list}) =>{
    console.log("if list is arrived",list);
    return (
      <div>
        <Header course={list} />
        <Content courses={list}/>
        
      </div>
    )
  }

export default Course;