import { useState } from 'react'

const NewBlogForm = ({ createNew }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createNew({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="URL"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm