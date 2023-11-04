import { useState } from 'react'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { notify, resetNotification } from '../reducers/notifReducer'

const Blog = ({ blog, user, updateBlogs, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

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
    const blogUpdate = { ...blog,
      likes: blog.likes + 1
    }

    updateBlogs(blogUpdate)
  }


  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        deleteBlog(blog)
        dispatch(notify(`the blog ${blog.title} by ${blog.author} was deleted`, 'error'))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 4000)

      } catch({ response }) {
        console.log(response.data)
        dispatch(notify(response.data.error, 'error'))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 4000)
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