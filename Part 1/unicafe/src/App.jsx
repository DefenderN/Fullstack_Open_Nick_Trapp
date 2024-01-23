import { useState } from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>{props.title} </h1>
    </div>
     
  )
}

const Button = (props) => {

  return(
    <div>
      <button onClick = {props.onClick} >
        {props.text}
      </button>
    </div>
  )
}

const Statistics = (props) => {

let total = props.goodFeedbackCount + props.neutralFeedbackCount + props.badFeedbackCount

// calculates the average and return 0 if no feedback is given yet
let average = 0
  if (props.goodFeedbackCount + props.neutralFeedbackCount + props.badFeedbackCount == 0){
  
    return (
      <div>
        <StatisticLine name = {"No feedback given"}/>
      </div>

    )
  
  } else {
  average = (props.goodFeedbackCount-props.badFeedbackCount)/(props.goodFeedbackCount + props.neutralFeedbackCount + props.badFeedbackCount)
}

// calculate % positive feedback
let positivePercentage = 0 
  if (props.goodFeedbackCount + props.neutralFeedbackCount + props.badFeedbackCount == 0){
  } else {
    positivePercentage = props.goodFeedbackCount/(props.goodFeedbackCount + props.neutralFeedbackCount + props.badFeedbackCount) * 100
  }

  return(
    <div>
      <table>
        <tbody>
        <StatisticLine name = {"good"}     value = {props.goodFeedbackCount}/>
        <StatisticLine name = {"neutral"}  value = {props.neutralFeedbackCount}/>
        <StatisticLine name = {"bad"}      value = {props.badFeedbackCount}/>
        <StatisticLine name = {"average"}  value = {average}/>
        <StatisticLine name = {"all"}      value = {total} />
        <StatisticLine name = {"positive"} value = {positivePercentage + " %"}/>
        </tbody>
      </table>
      
      


      
    </div>
  )
}

const StatisticLine = (props) => {

  return (
      <tr>
        <td>
        {props.name}
        </td>
        <td>
          {props.value}
        </td>
      </tr>

  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodFeedbackCount = () => {
    setGood(good + 1)
  }

  const increaseNeutralFeedbackCount = () => {
    setNeutral(neutral + 1)
  }

  const increaseBadFeedbackCount = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title = {"give feedback"} />
      
      <Button 
        onClick = {increaseGoodFeedbackCount}
        text = {"good"}
      />
      <Button 
        onClick = {increaseNeutralFeedbackCount}
        text = {"neutral"}
      />
      <Button 
        onClick = {increaseBadFeedbackCount}
        text = {"bad"}
      />

      <Header title = {"statistics"} />

      <Statistics 
      goodFeedbackCount = {good} 
      neutralFeedbackCount = {neutral}
      badFeedbackCount = {bad}
      />

    </div>
  )
}

export default App