{/* This is a comment */}

import { useState } from "react"

const Header = (props) => {
  console.log("Header component was called")
  console.log("Props of Header are:")
  console.log(props)
  return (
    <div>
      <h1>{props.course.name} </h1>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
const Content = (props) => {
  console.log("Content component was called") 
  console.log("Props of Content are:")
  console.log(props)

  const [part1, part2, part3] = props.course.parts 

  return (
    <div>
      <Part part = {part1.name} exercises = {part1.exercises}/>
      <Part part = {part2.name} exercises = {part2.exercises}/>
      <Part part = {part3.name} exercises = {part3.exercises}/>
    </div>
  )
}

const Part = (props) => {
  console.log("Part component was called")
  console.log("Props of Part are:")
  console.log(props)


  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  
  console.log("Total component was called")
  console.log("Props of Total are:")
  console.log(props)

  const [part1, part2, part3] = props.course.parts

  const totalExcercises = part1.exercises + part2.exercises + part3.exercises 

  return (
    <div>
      <p>Number of exercises {totalExcercises}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  console.log("App component was called")

  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header  course={course}  />
      <Content course={course}  />
      <Total   course={course}  />
      <div>{counter}</div>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />  
      <Display counter={counter}/>
    </div>
  )
}

export default App