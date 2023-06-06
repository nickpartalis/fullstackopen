import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAllPersons = () => {
  return (
    axios
      .get(baseUrl)
      .then(response => response.data)
  )
}

const createNewPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (id, newInfo) => {
  return axios.put(`${baseUrl}/${id}`, newInfo)
}

export default { getAllPersons, createNewPerson, deletePerson, updateNumber }