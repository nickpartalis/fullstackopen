const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => 
          <div key={person.id}>
            {person.name} {person.number} {""}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>)
      }
    </div>
  )
}

export default Persons