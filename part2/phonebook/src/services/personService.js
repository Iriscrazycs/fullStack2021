import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getData =()=>{
    return axios.get(baseUrl)
}

const postData=(newObj)=>{
    return axios.post(baseUrl,newObj)
}

const deleteData=(id)=>{
    return axios.delete(baseUrl+"/"+id)
}

const upgradeData=(id,data)=>{
    return axios.put(baseUrl+"/"+id,data)
}

export{getData,postData,deleteData,upgradeData}