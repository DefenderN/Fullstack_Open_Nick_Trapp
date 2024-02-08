import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("") 
  const [showAll, setShowAll] = useState(true)
  console.log("App component is called")


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  // The empty array in useEffect signals to only execute the Effect hook with the
  // first initialization of the app component and NOT when it is reloaded
  // e.g. when its samples changed
  useEffect(hook, [])
  
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    // Create new noteObject
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      
    }
    // POST new noteObject to the server and update Notes state with the response from the server
    // which includes the noteObject we send now being found in response.data
    // because the notes state changes the UI is updated
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  
    // Update the notes State of the App component in the browser
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    // The url for the specific note
    const url = `http://localhost:3001/notes/${id}`
    // The note that matches the id
    const note = notes.find(n => n.id === id)
    //object spread syntax copying and modifying a note.
    // In this case it inverts the "important" property of the note
    const changedNote = {...note, important: !note.important}

    //replace the note on the JSON server with the put method
    axios
      .put(url, changedNote)
      .then(response => {
        // After the server responds, the Notes array is updated
        // using the .map() function on the existing notes array
        // Here it compares each note id with the id that got changed and
        // when it finds the note entry whose id changed, it replaces it with the changedNote
        // which is accessed by response.data
        setNotes(notes.map(n => n.id !== id ? n : response.data))
      })

    console.log(`importance of ${id} needs to be toggled`)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App