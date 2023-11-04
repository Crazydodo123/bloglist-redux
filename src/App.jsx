import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { useDispatch } from 'react-redux'
import { notify, resetNotification } from './reducers/notifReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
      const receivedBlog = await blogService.create(blogToAdd)
      const newBlog = { ...receivedBlog, user }

      setBlogs(blogs.concat(newBlog))
      dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`))
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
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        setUser={setUser}
      />

    </div>
  )
}

export default App