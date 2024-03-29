import { useState, useEffect } from 'react'
import PersonService from './services/PersonService'


/**
 * A Notification component that shows a message for a few
 * seconds on the screen e.g. confirming the addition of a person to
 * the phonebook.
 */
const Notification = ({notification}) => {
  console.log(notification.message)
  console.log(notification.isPositive)

  // Verify if the Notification is positive or negative
  const color = notification.isPositive?"green":"red"

  // Do not show the Notification if there is no message
  if (notification.message === null){
    return null
  }

  return (
    <div className="Notification"
         style={{color:color}}>
      {notification.message}
    </div>
  )  
}


const Filter = ({filterString, onChange}) => {
  return (
    <div>
        filter shown with <input value={filterString} onChange={onChange}/>
        </div>
  )
}

const PersonForm = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
            <div>
              name: <input value={newName} onChange={onNameChange}/>
            </div>
            <div>
              number: <input value={newNumber} onChange={onNumberChange}/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
      </form>
  )
}

const PersonList = ({persons, onRemovePerson}) => {
  return(
    <ul>
        {persons.map(person => 
          <li key={persons.indexOf(person)}> 
          {person.name}  {person.number}   
          <button onClick={() => onRemovePerson(person.id)}>Delete</button>
         </li>
        )}
    </ul>
  )
}


const App = () => {

  const defaultNotification = {message:null,isPositive:true}

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterString, setFilterString] = useState('')
  const [notification, setNotification] = useState(defaultNotification)

  
  console.log("App component was called")

  useEffect(() => {
    PersonService.getPersonsFromServer()
                 .then(persons => setPersons(persons))
  }, [])

  // Creates a filtered array where only the persons with the filtered condition are in.
  // It also ensures that both strings, the filterString and the personName are in lowercase during the comparison
  // and that whitespaces at the start and end of the input become trimmed off.
  console.log("This is the personsArray which is to be filtered:", persons)
  const personsToShow = persons.filter( 
    (person) => {
      return person.name.toLowerCase().includes(filterString.trim().toLowerCase())
    }
  )
  console.log("This is the personsToShowArray:", personsToShow)

  const addNameAndNumber = (event) => {
    event.preventDefault()
    // Check if name is already in the persons array
    if (personNameAlreadyExists(newName.trim(),persons)){
      console.log(newName, "already exists in persons array")
      // Ask user to confirm number replacement 
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with the new one?`)) {
        
        // Find person object to be updated
        const existingPerson = persons.find(person => person.name === newName.trim())
        console.log("existingPerson to be updated is:", existingPerson)
        // Create updated Person object containing the new number
        const updatedPerson = {...existingPerson, number : newNumber.trim()}
        console.log("updatedPerson is:", updatedPerson)
        // Update the database with the updatedPerson
        PersonService.updatePerson(updatedPerson)
                     .then(updatedPerson => {
                        // Replace the old person with the new one from the response and update the Persons state
                        setPersons(persons.map(person => {
                          return person.id === updatedPerson.id ? updatedPerson : person
                      }))
                      // reset input fields
                      setNewName("")
                      setNewNumber("")
                      // Update notification that the persons number was updated.
                      setNotification({message:`Updated ${updatedPerson.name}s number`,
                                        isPositive:true})
                                        // Reset the Notification after 5 seconds so that it disappears
                      setTimeout(() => {
                        setNotification(defaultNotification)
                      }, 5000)
                     })
                     .catch(error=> {
                      console.log("An error has ocurred while trying to update a persons data:",error)
                      setNotification({message: `An error has ocurred while trying to update the data of ${newName}.`,
                                    isPositive:false})
                      setTimeout(() => {
                        setNotification(defaultNotification)
                      }, 5000)
                    })

      }
    }
    else {
      console.log(newName, "will be added to the persons array")
      // Create and add new person object
      const newPersonObject = {
        name : newName.trim(),
        number: newNumber.trim()
      }

      //Add newPersonObject to the server and concat the returned PersonObject
      // from the promise down below
      PersonService.addPersonToServer(newPersonObject)
                   .then(addedPerson => {
                      setPersons(persons.concat(addedPerson))
                      //reset input field
                      setNewName("")
                      setNewNumber("")
                      // Update notification that the person was added to the db.
                      setNotification({message:`Added ${addedPerson.name}s number`,
                      isPositive:true})
                      // Reset the Notification after 5 seconds so that it disappears
                      setTimeout(() => {
                        setNotification(defaultNotification)
                      }, 5000)
                    })
                    .catch(error=> {
                      setNotification({message: `${newName} could not be added to the server`,
                                    isPositive:false})
                      setTimeout(() => {
                        setNotification(defaultNotification)
                      }, 5000)
                    })
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
  }

  const handleOnRemovePerson = (id) => {
    // Find the person which is to be removed
    const person = persons.find(person => person.id === id)

    // Ask user for confirmation to remove the person
   if (window.confirm(`Delete ${person.name}`)) {
    // Delete user from server database after positive confirmation by the user
     PersonService.removePersonFromServer(person)
                  .then((servermessage) => {
    // Remove deleted user from the PersonsArray, which updates the user interface
                    console.log("Server message:",servermessage)
                    console.log("Person array before deletion is:", persons)
                    setPersons(persons.filter(personEntry => personEntry.id !== person.id))
                    console.log("Person data to be removed is:", person)
                  })
                  .catch(error=> {
                    setNotification({message: `Information of ${person.name} has already been removed from server`,
                                  isPositive:false})
                    setTimeout(() => {
                      setNotification(defaultNotification)
                    }, 5000)
                  })
     }
  }

  const personNameAlreadyExists = (newPersonName, personsArray) => {
    return personsArray.some((person) => person.name === newPersonName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}></Notification>
      <Filter filterString={filterString} onChange={handleOnFilterStringChange}/>
      <h3>Add a new Person:</h3>
      <PersonForm onSubmit={addNameAndNumber} 
                  newName={newName} 
                  newNumber={newNumber} 
                  onNameChange={handleOnNameChange} 
                  onNumberChange={handleOnNumberChange}/>
      <h3>Names and numbers:</h3>
      <PersonList persons={personsToShow} onRemovePerson={handleOnRemovePerson}/>
    </div>
  )
}

export default App