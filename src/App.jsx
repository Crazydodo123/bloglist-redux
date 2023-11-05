import { useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notifReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { checkSavedUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(checkSavedUser())
  }, [])

  const user = useSelector(state => state.user)

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
        />
      }

      {user &&
        <div>
          <Status />

          <Togglable buttonLabel='create new blog'>
            <BlogForm
              addBlog={addBlog}
            />
          </Togglable>

          <BlogList
            addBlog={addBlog}
          />
        </div>
      }

    </div>
  )
}

export default App