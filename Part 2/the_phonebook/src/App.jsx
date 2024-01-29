import { useState } from 'react'
import PersonEntry from './components/PersonEntry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Heiko',
      number: '+4915736273814' }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addNameAndNumber = (event) => {
    event.preventDefault()
    // Check if name is already in the persons array
    if (personNameAlreadyExists(newName.trim(),persons)){
    console.log(newName, "already exists in persons array") 
    alert(`${newName} already exists in the phonebook`)
    }
    // Check if the same number is already in the persons array
    else if (personNumberAlreadyExists(newNumber.trim(),persons)){
    alert(`${newNumber} already exists in the phonebook`)
    }
    else {
    console.log(newName, "will be added to the persons array")
    // Create and add new person object
    const newPersonObject = {
      name : newName.trim(),
      number: newNumber.trim()
    }
    setPersons(persons.concat(newPersonObject))
    //reset input field
    setNewName("")
    setNewNumber('')
  }
  }

  const handleOnNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleOnNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personNameAlreadyExists = (newPersonName, personsArray) => {
    // TODO: Compare personstrings and return flase or true
    return personsArray.some((person) => person.name === newPersonName)
  }

  const personNumberAlreadyExists = (newPersonNumber, personsArray) => {
    // TODO: Compare personstrings and return flase or true
    return personsArray.some((person) => person.number === newPersonNumber)
  }

  return (
    <div>
      <h2>phonebook </h2>
      <form onSubmit={addNameAndNumber}>
            <div>
              name: <input value={newName} onChange={handleOnNameChange}/>
            </div>
            <div>
              number: <input value={newNumber} onChange={handleOnNumberChange}/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <PersonEntry key={persons.indexOf(person)} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App