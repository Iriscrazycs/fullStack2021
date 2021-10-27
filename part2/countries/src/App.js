import React, { useState,useEffect } from 'react'
import axios from 'axios'

const App=()=>{
  const [searchName, setSearchName]=useState('')
  const[countries, setCountries]=useState([])
  const[page,setPage]=useState(500)
  const[show, setShow]=useState([])
  const[weather,setWeather]=useState([])

  const changeSearch=async(event)=>{
    console.log("are you here",event.target.value);
    setSearchName(event.target.value)
    console.log("searchname change",searchName);
    //changeCountries()
    
  }
  console.log("second for state change",searchName);
  console.log("page is outside",page);

  
  
  const stopRender =(event)=>(event.preventDefault())

  
 

  useEffect(()=>{
    console.log("searchname",searchName);
    const promise=axios.get("https://restcountries.com/v2/all")
    promise.then(country =>{
      console.log("promise data", country.data);
      setCountries(country.data)
      
      
    } )
    //console.log("more details about data",countries[0].name);
  },[])

  useEffect(()=>{
    setShow(countries.filter(country=> country.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())))
    console.log("the vlue after fitering",show);
  },[searchName])
  
  const api_key = process.env.REACT_APP_API_KEY
  console.log("key",api_key);
  
  
  const PageSet =(number)=>{
    
    //console.log("type of",typeof(number));
    setPage(number)
    console.log("value of page",page);
    //console.log("check list value",)
    
    
  }

  
  useEffect(()=>{
    console.log("weather data",page);
    if (page<500) {
      console.log("under 500");
      console.log("try weather effect-show",show);
      //console.log("try weather effect",show[page].capital);
      axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+show[page].capital)
          .then(saa =>{
            setWeather(saa.data)
          })
    }
  },[page])

  
  return(
    <div>
      <Filter renderStop={stopRender} searchChange={changeSearch}/>
      <Forms list={show} stateChange={PageSet} singleNumber={page} weatherinfo={weather}/>
    </div>
  )
}

const Filter =({searchChange,renderStop})=>{
  return (
    <div>
      <form onSubmit={renderStop}>
        find countries
        <input onChange={searchChange}/>
      </form>


    </div>
  )
}

const Forms =({list,stateChange,singleNumber,weatherinfo})=>{
  console.log("form function",list);
  if (list.length > 10){
    return "Too many matches, specify another filter"
  }else if(list.length===1){
    const oneCountry=list[0]
    console.log("length function");
    console.log("what is ",oneCountry);
    
      return singleCountry(oneCountry)
  }else{
    if(singleNumber<500){
      return singleCountry(list[singleNumber],weatherinfo)
    }
    return listCountries(list,{stateChange})
  }
}

const listCountries=(list,{stateChange})=>{
  console.log("here is the place for the list of name",list);
  console.log("type of function",typeof(stateChange));
  if (list.length>0){
    console.log("list stop1");
    return(
      <div>
        {list.map((country,i)=>
        <div key={i}>
              {country.name} 
              <button onClick={()=>stateChange(i)}  >show</button>     
        </div>)}
      </div>
  
    )
  }else{
    return(
      <div></div>
    )
  }
  
}




const singleCountry =(one,weatherinfo)=>{
  console.log("list for single",one);
  console.log("list result",weatherinfo);
  return (
    <div>
      <h1>{one.name}</h1>
      <p>Capital: {one.capital}</p>
      Population: {one.population}
      <h2>languages</h2>
      <ul>
        {one.languages.map((item,i)=>
        <List key={i} language={item}/>
        )}
      </ul>
      <div>
      <img src={one.flags.png} />
      </div>
      <div>
        <h2><b>Weather in {weatherinfo.location.name}</b></h2>
        <p><b>temperature</b>: {weatherinfo.current.temperature} celsius</p>
        <div>
        <img src={weatherinfo.current.weather_icons[0]} />
        </div>
        <p><b>wind</b>: {weatherinfo.current.wind_speed} mph direction {weatherinfo.current.wind_dir}</p>
      </div>
    </div>
  )

}

const List =({language})=>{
    console.log("languages",{language});
  return(
      <li >
          {language.name}
        </li>

    )
}




export default App;
