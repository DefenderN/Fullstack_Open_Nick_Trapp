import { useState } from 'react'
import PersonEntry from './components/PersonEntry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Heiko' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    // Check if name is already in the persons array
    if (personNameAlreadyExists(newName.trim(),persons)){
    console.log(newName, "already exists in persons array") 
    alert(`${newName} already exists in the phonebook`)
    }
    else {
    console.log(newName, "will be added to the persons array")
    // Create and add new person object
    const newPersonObject = {
      name : newName.trim()
    }
    setPersons(persons.concat(newPersonObject))
    //reset input field
    setNewName("")
  }
  }

  const handleOnChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const personNameAlreadyExists = (newPersonName, personsArray) => {
    // TODO: Compare personstrings and return flase or true
    return personsArray.some((person) => person.name === newPersonName)

  }

  return (
    <div>
      <h2>phonebook </h2>
      <form onSubmit={addName}>
            name: <input value={newName} onChange={handleOnChange}/>
                  <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <PersonEntry key={persons.indexOf(person)} personName={person.name} />
        )}
      </ul>
    </div>
  )
}

export default App