import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
  
  // <div>{text} {value}</div>
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) return <div>No feedback given</div>
  
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good+neutral+bad} />
        <StatisticLine text={"average"} value={(good-bad)/total} />
        <StatisticLine text={"positive"} value={(good/total)*100 + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div className="feedback">
        <h2>give feedback</h2>
        <Button handleClick={() => setGood(good+1)} text={"Good"}/>
        <Button handleClick={() => setNeutral(neutral+1)} text={"Neutral"}/>
        <Button handleClick={() => setBad(bad+1)} text={"Bad"}/>
      </div>
      <div className="statistics">
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

export default App