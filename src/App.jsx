import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { useDispatch } from 'react-redux'
import { notify } from './reducers/notifReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUser !== 'null' && loggedUser !== null) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const addBlog = async (blogToAdd) => {
    try {
      const newBlog = await dispatch(createBlog(blogToAdd, user))
      dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`))

    } catch({ message }) {
      dispatch(notify(message, 'error'))
    }
  }

  return (
    <div>
      <Notification />

      {!user &&
        <LoginForm
          setUser={setUser}
        />
      }

      {user &&
        <div>
          <Status
            user={user}
            setUser={setUser}
          />

          <Togglable buttonLabel='create new blog'>
            <BlogForm
              addBlog={addBlog}
            />
          </Togglable>
        </div>
      }


      <BlogList
        user={user}
        setUser={setUser}
        addBlog={addBlog}
      />

    </div>
  )
}

export default App