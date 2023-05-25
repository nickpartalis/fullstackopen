const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const Content = (props) => {
  return (
    <div>
      <Part { ...props.parts[0] } />
      <Part { ...props.parts[1] } />
      <Part { ...props.parts[2] } />
    </div>
  )
}

const Total = (props) => {
  const [ex1, ex2, ex3] = [
    props.parts[0].exercises, 
    props.parts[1].exercises, 
    props.parts[2].exercises
  ]
  return <p>Number of exercises {ex1 + ex2 + ex3}</p>
}

const App = () => {
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App