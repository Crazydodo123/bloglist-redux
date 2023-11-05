import { Link } from 'react-router-dom'
import Blog from './Blog'

import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const sortedBlogs = [...blogs].sort((a, b) => {
    return (b.likes - a.likes)
  })

  return (
    <div id='bloglist'>
      <br />
      {sortedBlogs.map(blog => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList