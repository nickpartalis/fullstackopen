const Header = ({ name }) => {
  return <h3>{name}</h3>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({ course }) => {
  return (
    <strong>
      Total of {
      course.parts.reduce((acc, val) => acc + val.exercises, 0)
      } exercises
    </strong>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

export default Course