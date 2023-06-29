import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import phonebookServices from "./services/phonebookServices"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({})

  useEffect(() => {
    phonebookServices 
      .getAllPersons()
      .then(data => setPersons(data))
  }, [])

  const showNotification = (notificationObj) => {
    setNotification(notificationObj)
    setTimeout(() => {
      setNotification({})
    }, 5000)
  }

  const manageDuplicate = (name) => {
    const duplicate = persons.find(person => person.name === name)
    if (duplicate.number === newNumber) {
      alert(`${name} is already added to the phonebook`)
      setNewName("")
      setNewNumber("")
      return
    }

    if (window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)) {
      const newInfo = {
        ...duplicate,
        number: newNumber
      }
      phonebookServices.updateNumber(duplicate.id, newInfo)
        .then(_ => {
          setPersons(persons.map(person => person.name === name ? newInfo : person))
          showNotification({type: "notice", message: `${name}'s number updated`})
        })
        .catch(err => 
          showNotification({type: "error", message: err.response.data.error})
        )
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      manageDuplicate(newName)
      return
    }

    const newPerson = { 
      name: newName,
      number: newNumber
    }
    phonebookServices.createNewPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        showNotification({type: "notice", message: `Added ${newName}`})
      })
      .catch(err => 
        showNotification({type: "error", message: err.response.data.error})
      )
    
    setNewName("")
    setNewNumber("")
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteClick = (name) => {
    const person = persons.find(p => p.name === name)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookServices
        .deletePerson(person.id)
        .then(() => showNotification({type: "notice", message: `Deleted ${person.name}`}))
        .catch(err => showNotification({
          type: "error", 
          message: `Information of ${person.name} has already been removed from server`
        }))
      setPersons(persons.filter(person => person.name !== name))
    }
  }

  const formProps = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    handleNewName
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification {...notification} />
      <Filter filter={filter} handleChange={handleFilterChange} />

      <h3>Add new number</h3>
      <PersonForm {...formProps} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={handleDeleteClick} />
    </>
  )
}

export default App