import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  
    token = `bearer ${newToken}`
    
  }


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log("here is the token", token)
  const config = {    headers: { Authorization: token },  }
  const response = await axios.post(baseUrl, newObject,config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  console.log("check the link", request);
  return request.then(response => response.data)
}

const deleteOne = (id, newObject) => {
  const config = {    headers: { Authorization: token },  }
  console.log("token is ", config);
  const request = axios.delete(`${ baseUrl }/${id}`,
  {    
    headers: { 
      Authorization: token,
    },  
  })
  //console.log("check the link", request);
  return request.then(response => response.data)
}



export default { getAll,setToken,create,update,deleteOne }