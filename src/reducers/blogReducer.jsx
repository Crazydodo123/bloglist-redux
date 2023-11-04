import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    filterBlog(state, action) {
      return state.filter(blog => blog.id != action.payload)
    },
    changeBlog(state, action) {
      return state.map(blog => {
        if (blog.id === action.payload.id) {
          const newBlog = { ...action.payload,
            user: blog.user
          }
          return newBlog
        } else {
          return blog
        }
      })
    }
  }
})

const { setBlogs, appendBlog, filterBlog, changeBlog } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogToAdd, user) => {
  return async (dispatch) => {
    const receivedBlog = await blogService.create(blogToAdd)

    const newBlog = { ...receivedBlog, user }

    dispatch(appendBlog(newBlog))
    return newBlog
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
      await blogService.remove(blogId)
      dispatch(filterBlog(blogId))
  }
}

export const updateBlog = (blogUpdate) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogUpdate)
    dispatch(changeBlog(updatedBlog))
  }
}

export default blogReducer.reducer