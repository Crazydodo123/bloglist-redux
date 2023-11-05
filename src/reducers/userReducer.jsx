import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

const { setUser } = userReducer.actions

export const checkSavedUser = () => {
  return dispatch => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUser !== 'null' && loggedUser !== null) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const login = (username, password) => {  
  return async (dispatch) => {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.setItem(
      'loggedBloglistUser', null
    )
    dispatch(setUser(null))
  }
}

export default userReducer.reducer