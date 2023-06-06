import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import phonebookServices from "./services/phonebookServices"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    phonebookServices 
      .getAllPersons()
      .then(data => setPersons(data))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      setPersons(persons.map(person => person.name === name ? newInfo : person))
      setNewName("")
      setNewNumber("")
    }
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
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteClick = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookServices.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
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
      <Filter filter={filter} handleChange={handleFilterChange} />

      <h3>Add new number</h3>
      <PersonForm {...formProps} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={handleDeleteClick} />
    </>
  )
}

export default App