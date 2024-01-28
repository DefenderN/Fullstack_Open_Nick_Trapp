import { useState } from 'react'
import PersonEntry from './components/PersonEntry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Heiko Mikoschokolaidschaschlik' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    // Create and add new person object
    const newPersonObject = {
      name : newName
    }
    setPersons(persons.concat(newPersonObject))

    //reset input field
    setNewName("")
  }

  const handleOnChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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