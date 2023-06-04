const Filter = ({ filter, handleChange }) => {
  return (
    <p>
      Filter shown with <input 
        value={filter} 
        onChange={handleChange} 
      />
    </p>
  )
}

export default Filter