import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notifReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id

  const blog = useSelector(state => {
    return state.blogs.find(blog => blog.id === id)
  })

  if (!blog) return null

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const addLike = async () => {
    const blogUpdate = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      dispatch(updateBlog(blogUpdate))
    } catch({ message }) {
      console.log(message)
      dispatch(notify(message, 'error'))
    }
    
  }

  const addComment = async (e) => {
    e.preventDefault()
    const blogUpdate = {
      ...blog,
      comments: blog.comments.concat(e.target[0].value)
    }

    try {
      dispatch(updateBlog(blogUpdate))
      e.target[0].value = ''
    } catch({ message }) {
      console.log(message)
      dispatch(notify(message, 'error'))
    }
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(notify(`the blog ${blog.title} by ${blog.author} was deleted`, 'error'))

      } catch({ message }) {
        console.log(message)
        dispatch(notify(message, 'error'))
      }
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        {blog.url} <br />
        {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.user.name} <br />
        {user.username === blog.user.username &&
          <button onClick={removeBlog} id='remove-button'>remove</button>
        }
      </div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input></input><button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog