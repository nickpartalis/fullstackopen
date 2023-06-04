import { useState } from 'react'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ 
      name: newName,
      number: newNumber
    }))
    setNewName("")
    setNewNumber("")
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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
      <Persons persons={persons} filter={filter} />
    </>
  )
}

export default App