import axios from "axios"

const baseUrl = "/api/persons"

const getAllPersons = () => {
  return (
    axios
      .get(baseUrl)
      .then(res => res.data)
  )
}

const createNewPerson = (newPerson) => {
  return (
    axios
      .post(baseUrl, newPerson)
      .then(res => res.data)
  )
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (id, newInfo) => {
  return axios.put(`${baseUrl}/${id}`, newInfo)
}

export default { getAllPersons, createNewPerson, deletePerson, updateNumber }