import Blog from './Blog'

import { useSelector } from 'react-redux'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = [...blogs].sort((a, b) => {
    return (b.likes - a.likes)
  })

  return (
    <div id='bloglist'>
      <br />
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default BlogList