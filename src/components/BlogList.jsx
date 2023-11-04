import Blog from './Blog'

import { useDispatch, useSelector } from 'react-redux'


const BlogList = ({
  user
}) => {
  const blogs = useSelector(state => state.blogs)

  if (!user) return null

  const sortedBlogs = [...blogs].sort((a, b) => {
    return (b.likes - a.likes)
  })

  return (
    <div id='bloglist'>
      <br />
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          updateBlogs={updateBlogs}
        />
      )}
    </div>
  )
}

export default BlogList