import { useState } from 'react'
import PersonEntry from './components/PersonEntry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Heiko',
      number: '+4915736273814' },
    { name: "James",
      number: "+12345"},
    { name: 'Jona',
    number: '+4915736273814' },
    { name: 'Ebersberg',
    number: '+4915736273814' },
  ]) 
  
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterString, setFilterString] = useState('')
  const [useFilter, setUseFilter] = useState(true)

      // Creates a filtered array where only the persons with the filtered condition are in.
    // It also ensures that both strings, the filterString and the personName are in lowercase during the comparison
    // and that whitespaces at the start and end of the input become trimmed off.
    
    const personsToShow = persons.filter(
      (person) => {
        return person.name.toLowerCase().includes(filterString.trim().toLowerCase())
        }
      )

  const addNameAndNumber = (event) => {
    event.preventDefault()
    // Check if name is already in the persons array
    if (personNameAlreadyExists(newName.trim(),persons)){
    console.log(newName, "already exists in persons array") 
    alert(`${newName} already exists in the phonebook`)
    }
    // Check if the same number is already in the persons array
    // else if (personNumberAlreadyExists(newNumber.trim(),persons)){
    // alert(`${newNumber} already exists in the phonebook`)
    // }
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
    setNewNumber("")
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

  const handleOnFilterStringChange = (event) => {
    console.log(event.target.value)
    setFilterString(event.target.value)
    if (event.target.value === "") {
      setUseFilter(false)
    }
    else {
      setUseFilter(true)
    }


  }

  const personNameAlreadyExists = (newPersonName, personsArray) => {
    return personsArray.some((person) => person.name === newPersonName)
  }

  // const personNumberAlreadyExists = (newPersonNumber, personsArray) => {
  //   return personsArray.some((person) => person.number === newPersonNumber)
  // }

  return (
    <div>
      <h2>phonebook </h2>
        <div>
        filter shown with <input value={filterString} onChange={handleOnFilterStringChange}/>
        </div>
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
        {personsToShow.map(person => 
          <PersonEntry key={persons.indexOf(person)} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App