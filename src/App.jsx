import { useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notifReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { checkSavedUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
    <Router>
      <Notification />

      {!user &&
        <LoginForm
        />
      }

      {user &&
        <div>
          <div>
            <Link to='/'>blogs</Link>
            <Link to='/users'>users</Link>
            <Status />
          </div>

          <h2>blogs</h2>

          <Routes>
            <Route path='/users/:id' element={<User />} />
            <Route path='/users' element={<Users />} />
            <Route path='/blogs/:id' element={<Blog />} />
            <Route path='/' element={<>
              <Togglable buttonLabel='create new blog'>
                <BlogForm
                  addBlog={addBlog}
                />
              </Togglable>
              <BlogList
                addBlog={addBlog}
              />
            </>} />
          </Routes>
          

          
        </div>
      }

    </Router>
  )
}

export default App