import { useState } from 'react'
 

const Button = (props) => {

  return(
    <div>
      <button onClick = {props.onClick} >
        {props.text}
      </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [anecdoteVotes, setAnecdoteVotes] = useState([0,0,0,0,0,0,0,0])
   
  const [selected, setSelected] = useState(0)

  const [IndexOfMostVotedAnecdote , setIndexOfMostVotedAnecdote] = useState(0)

  const setRandomSelected = () => {
    // make random number
    let randomNumber = Math.floor(Math.random()*(anecdotes.length))
    setSelected(randomNumber)
  }

  const updateAnecdoteVotes = () => {
    // TODO

    //Update the anecdoteVotes array by + 1 on the specific element
    // The specific element is the int "selected"
    console.log("updateAnecdoteVotes function was called")
    const updatedAnecdoteVotes = [...anecdoteVotes]
    updatedAnecdoteVotes[selected] += 1

    setAnecdoteVotes(updatedAnecdoteVotes)
    setIndexOfMostVotedAnecdote(indexOfMax(updatedAnecdoteVotes))
    

  }

  const indexOfMax = (array) => {
    if (array.length === 0) {
      return -1; // Handle empty array
    }
  
    let maxIndex = 0;
    let maxValue = array[0];
  
    for (let i = 1; i < array.length; i++) {
      if (array[i] > maxValue) {
        maxIndex = i;
        maxValue = array[i];
      } 
    }
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {anecdoteVotes[selected]} votes</p>
      <Button 
        onClick = {updateAnecdoteVotes}
        text = {"vote"}
      />
      <Button 
        onClick = {setRandomSelected}
        text = {"next anecdote"}
      />
      <h1>Anecdote with most votes</h1>
      {anecdotes[IndexOfMostVotedAnecdote]}
    </div>
  )
}

export default App