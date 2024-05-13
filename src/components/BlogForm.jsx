import { useState } from 'react'

import './blogform.css'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }

    await addBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit} id='blog-form'>
        <label htmlFor='title'>title: </label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor='author'>author: </label>
        <input
          type='text'
          name='author'
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor='url'>url: </label>
        <input
          type='text'
          name='url'
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type='submit' id='create-button'>create</button>
      </form>

    </div>
  )
}

export default BlogForm