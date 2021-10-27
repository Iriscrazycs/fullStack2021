import React, { useState,useEffect } from 'react'
import axios from 'axios'
import * as service from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [searchName, setSearchName]=useState('')
  const [message,setMessage]=useState('')
  
  /* delete
  axios.delete('http://localhost:3001/persons/5')
        .then(response => {
          setPersons(persons.filter(data=>
            data !=response.data
          ))
        })
  console.log("check persons",persons);
  */

  const addPersons =(event) =>{
    
    event.preventDefault()
    const obj={
      name: newName,
      number: newNumber
    }
    //check if the variable name will change.
    
    //simple version
    
    


    console.log("checking list for no repeat",persons);
    var repeat=true
    var number=0
    for (var i=0; i<persons.length;i++){
        if(persons[i].name===newName){
          repeat=false
          number=i
        }
    }
    if(repeat){
      service
      .postData(obj)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
     
    }else{
      if (window.confirm(newName+" is already added to phonebook, replace the old number with a new one?")) {
          const id=persons[number].id
          service.upgradeData(id,obj)
                  
            .then(response=>{
                  console.log("response",response);
                  setPersons(persons.filter(person=>
                    person !==id ? person: response.data))
                  })
      }
      
    }
    setMessage("Added "+newName)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    console.log("this is the list after adding",persons);
  
  }


  const changeName=(event) =>{
    console.log("this is for changname",event.target.value);
      setNewName(event.target.value)
  }

  const changeNumber=(event) =>{
    console.log("this is for changnumber",event.target.value);
      setNewNumber(event.target.value)
  }

  const changeSearch=(event)=>{
    console.log("checking is the search update",searchName);
      setSearchName(event.target.value)
  }

  const personDelete=(person)=>{
    if (window.confirm(("Delete "+person.name+" ?"))) {
      console.log('event is',person.id);
    service.deleteData(person.id)
          .then(response => {
            setPersons(persons.filter(data=>
              data !=response.data)
            )}) 
          .catch(error=>{
            setMessage(`Information of ${person.name} has already been removed from server`)
            
          })
    
    
    
    }
    
    
  }

  

  
  

  for (var i=0; i<persons.length;i++){
    console.log(i)
    console.log(searchName,"true or false",persons[i].name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))

  }

  //fetch the data from the server
  
  useEffect(()=>{
    console.log("this the effect hook");
      service
      .getData()
      .then(person =>{
      setPersons(person.data)
      
    })

    console.log("check persons data",persons);
    
    

  },[])

  console.log("check persons data2",persons);
  

  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <h2 className="message">{message}</h2>
      <Fliter value={searchName} searchChanger={changeSearch}/>
      
      <h2>add a new</h2>
      <PersonForm morePerson={addPersons} nameChange={changeName}
      numberChange={changeNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} search={searchName}
      deleteP={personDelete}/>
    </div>
  )
}



const PersonForm =({morePerson,nameChange,numberChange})=>{
  return(
    <div>
      <form onSubmit={morePerson} >
        <div>
          name: <input onChange={nameChange}/>
        </div>
        <div>
          number: <input  onChange={numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>

  )
}


const Persons =({persons,search,deleteP})=>{
  const filterOut= persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  console.log("filterOut is  ",filterOut);
  return(
    <div>
    {filterOut.map((person,i) =>
      <div key={i}>
      {person.name} {person.number}
      <button onClick={()=>deleteP(person)} >delete</button>
    </div>
    )}
    </div>
  )
}



const Fliter =({searchChanger}) =>{
  
  return(
    <form >
        <div>
         
          filter shown with:
          <input  onChange={searchChanger}/>
        </div>

      </form>
    
  )
}

export default App;