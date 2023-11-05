import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notifReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    const blogUpdate = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await dispatch(updateBlog(blogUpdate))
    } catch({ message }) {
      console.log(message)
      dispatch(notify(message, 'error'))
    }
    
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(notify(`the blog ${blog.title} by ${blog.author} was deleted`, 'error'))

      } catch({ message }) {
        console.log(message)
        dispatch(notify(message, 'error'))
      }
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>{blog.title} {blog.author}</span>
        <button onClick={toggleVisible}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className='description'>
        {blog.url} <br />
        {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.user.name} <br />
        {user.username === blog.user.username &&
          <button onClick={removeBlog} id='remove-button'>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog